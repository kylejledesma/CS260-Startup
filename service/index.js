const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';

// --------------------------------------------------------------------------
// 1. IN-MEMORY DATA STORE (Schema Implementation)
// --------------------------------------------------------------------------
// Matches your NoSQL Schema exactly. 
// In a real database, these would be separate collections.

let users = [];   // Collection: users (Stores profile + auth info)
let teams = [];   // Collection: teams (Stores shared group data)
let events = [];  // Collection: events (Stores time blocks)

// --------------------------------------------------------------------------
// 2. SERVER SETUP & MIDDLEWARE
// --------------------------------------------------------------------------
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// --------------------------------------------------------------------------
// 3. AUTHENTICATION ENDPOINTS
// --------------------------------------------------------------------------

// Create a new user (Registration)
apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    // Create user with the correct schema (uid, teamPins, etc.)
    const user = await createUser(req.body.username, req.body.password);
    setAuthCookie(res, user.token);
    res.send({ uid: user.uid, username: user.displayName });
  }
});

// Login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.username); // Assuming username input acts as email/id
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      setAuthCookie(res, user.token);
      res.send({ uid: user.uid, username: user.displayName });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// Logout
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// MIDDLEWARE: Verify User is Logged In
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    req.user = user; // Attach full user object to request
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// --------------------------------------------------------------------------
// 4. DATA SERVICE ENDPOINTS (Events & Teams)
// --------------------------------------------------------------------------

// GET /api/events
// Handles both "My Schedule" (default) and "Team View" (via ?teamPin=...)
apiRouter.get('/events', verifyAuth, (req, res) => {
  const { teamPin } = req.query; 

  if (teamPin) {
    // Team View: Return all events belonging to this specific Team PIN
    const teamEvents = events.filter(e => e.teamPin === teamPin);
    res.send(teamEvents);
  } else {
    // My Schedule: Return all events created by the logged-in user
    const myEvents = events.filter(e => e.ownerId === req.user.uid);
    res.send(myEvents);
  }
});

// POST /api/event
// Create a new calendar event
apiRouter.post('/event', verifyAuth, (req, res) => {
  const newEvent = {
    id: `evt_${uuid.v4()}`,          // Generate unique ID
    ownerId: req.user.uid,           // Automatically set owner to logged-in user
    teamPin: req.body.teamPin,       // null for personal events, or a pin for team events
    title: req.body.title,
    type: req.body.type,             // 'meetings', 'classes', etc.
    start: req.body.start,
    end: req.body.end,
  };

  events.push(newEvent);
  res.send(newEvent);
});

// POST /api/team
// Create a new team
apiRouter.post('/team', verifyAuth, (req, res) => {
  const newPin = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit PIN
  
  const newTeam = {
    teamPin: newPin,
    name: req.body.name,
    memberIds: [req.user.uid]
  };
  
  teams.push(newTeam);
  
  // Update User Schema: Add pin to user's team list
  req.user.teamPins.push(newPin); 
  
  res.send(newTeam);
});

// POST /api/team/join
// Join an existing team using a PIN
apiRouter.post('/team/join', verifyAuth, (req, res) => {
  const { teamPin } = req.body;
  const team = teams.find(t => t.teamPin === teamPin);

  if (!team) {
    res.status(404).send({ msg: "Team not found" });
    return;
  }

  // Add user to Team's member list
  if (!team.memberIds.includes(req.user.uid)) {
    team.memberIds.push(req.user.uid);
  }

  // Add Team to User's pin list
  if (!req.user.teamPins.includes(teamPin)) {
    req.user.teamPins.push(teamPin);
  }

  res.send({ msg: "Joined team", team: team });
});


// --------------------------------------------------------------------------
// 5. HELPER FUNCTIONS
// --------------------------------------------------------------------------

// Finds user by any field (email, token, uid)
async function findUser(field, value) {
  if (!value) return null;
  return users.find((u) => u[field] === value);
}

// Creates a user matching your Schema
async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  
  const newUser = {
    // Public Schema Fields
    uid: `user_${uuid.v4()}`,
    displayName: username,
    email: username,          // Using username as email for simplicity
    teamPins: [],
    
    // Private Auth Fields
    password: passwordHash,
    token: uuid.v4(),
  };

  users.push(newUser);
  return newUser;
}

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return index.html for unknown paths
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';

// 1. IN-MEMORY DATA STORE (Schema Implementation)
let users = [];   // Collection: users
let teams = [];   // Collection: teams
let events = [];  // Collection: events

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// GET EVENTS (Handles both "My Schedule" and "Team View")
apiRouter.get('/events', verifyAuth, (req, res) => {
  const { teamPin, type } = req.query; // Grab ?teamPin=... from URL
  const currentUser = req.user;

  if (teamPin) {
    // QUERY 1: "Team View" (Heatmap)
    // SQL equivalent: SELECT * FROM events WHERE teamPin == '64802'
    const teamEvents = events.filter(e => e.teamPin === teamPin);
    res.send(teamEvents);
  
  } else {
    // QUERY 2: "My Schedule" (Default)
    // SQL equivalent: SELECT * FROM events WHERE ownerId == 'user_12345'
    const myEvents = events.filter(e => e.ownerId === currentUser.uid);
    res.send(myEvents);
  }
});

// POST EVENT (Create a new time block)
apiRouter.post('/event', verifyAuth, (req, res) => {
  const currentUser = req.user;
  const newEvent = req.body;

  // Enforce Schema Structure
  const eventToStore = {
    id: uuid.v4(),                    // Generate unique ID "evt_987"
    ownerId: currentUser.uid,         // "Who created this?" (From Auth)
    teamPin: newEvent.teamPin,        // "Which team?"
    title: newEvent.title,
    type: newEvent.type,              // 'meetings', 'classes', etc.
    start: newEvent.start,            // ISO String
    end: newEvent.end
  };

  events.push(eventToStore);
  res.send(eventToStore);
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// Create a Team
apiRouter.post('/team', verifyAuth, (req, res) => {
  const newPin = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit PIN
  
  const newTeam = {
    teamPin: newPin,
    name: req.body.name,
    memberIds: [req.user.uid] // Add creator to the team
  };
  
  teams.push(newTeam);
  
  // Also update the User's profile to include this pin (Foreign Key maintenance)
  const user = users.find(u => u.uid === req.user.uid);
  if (user) user.teamPins.push(newPin);

  res.send(newTeam);
});

// Join a Team
apiRouter.post('/team/join', verifyAuth, (req, res) => {
  const { teamPin } = req.body;
  const team = teams.find(t => t.teamPin === teamPin);

  if (!team) {
    res.status(404).send({ msg: "Team not found" });
    return;
  }

  // Add user to team
  if (!team.memberIds.includes(req.user.uid)) {
    team.memberIds.push(req.user.uid);
  }

  // Add team to user
  const user = users.find(u => u.uid === req.user.uid);
  if (!user.teamPins.includes(teamPin)) {
    user.teamPins.push(teamPin);
  }

  res.send({ msg: "Joined team", team: team });
});

// createUser adds a new user to the in-memory store.
async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  
  const newUser = {
    // Schema fields
    uid: uuid.v4(),               // Generates "user_12345"
    displayName: username,        // Using username as display name for now
    email: username,              // Assuming username is email based on your login.jsx
    teamPins: [],                 // Initialize empty array for teams
    
    // Auth fields (internal use only, not part of public schema)
    password: passwordHash,
    token: uuid.v4(),
  };

  users.push(newUser);
  return newUser;
}

async function findUser(field, value) {
  if (!value) return null;

  return users.find((u) => u[field] === value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

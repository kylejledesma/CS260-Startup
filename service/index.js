const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

// --------------------------------------------------------------------------
// 1. SERVER SETUP & MIDDLEWARE
// --------------------------------------------------------------------------
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// --------------------------------------------------------------------------
// 2. AUTHENTICATION ENDPOINTS
// --------------------------------------------------------------------------

// Create a new user (Registration)
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.username)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    // Create user with the correct schema (uid, teamPins, etc.)
    const user = await createUser(req.body.username, req.body.password);
    setAuthCookie(res, user.token);
    res.send({ uid: user.uid, username: user.username });
  }
});

// Login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.username); // Assuming username input acts as email/id
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      await DB.updateUser(user);
      setAuthCookie(res, user.token);
      res.send({ uid: user.uid, username: user.username });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// Logout
apiRouter.delete('/auth/logout', async (_req, res) => {
  const user = await DB.getUserByToken(req.cookies[authCookieName]);
  if (user) {
    delete user.token; // Remove token from user record
    await DB.updateUser(user); // Save the change to the DB
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// MIDDLEWARE: Verify User is Logged In
const verifyAuth = async (req, res, next) => {
  const user = await DB.getUserByToken(req.cookies[authCookieName]);
  if (user) {
    req.user = user; // Attach full user object to request
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// --------------------------------------------------------------------------
// 3. DATA SERVICE ENDPOINTS
// --------------------------------------------------------------------------

// GET /api/events
// Handles both "My Schedule" (default) and "Team View" (via ?teamPin=...)
apiRouter.get('/events', verifyAuth, async (req, res) => {
  const { teamPin } = req.query; 

  if (teamPin) {
    // Get team details to fin out who the members are
    const team = await DB.getTeam(teamPin);

    if (team && team.memberIds && team.memberIds.length > 0) {
      // Team View: Return all events created by team members
      const teamEvents = await DB.getEventsByOwnerIds(team.memberIds);
      res.send(teamEvents);
      return;
    } else {
      res.send([]); // No members, no events
    }
  } else {
    // My Schedule: Return all events created by the logged-in user
    const myEvents = await DB.getEvents({ ownerId: req.user.uid });
    res.send(myEvents);
  }
});

// POST /api/event
// Create a new calendar event
apiRouter.post('/event', verifyAuth, async (req, res) => {
  const newEvent = {
    id: `evt_${uuid.v4()}`,          // Generate unique ID
    ownerId: req.user.uid,           // Automatically set owner to logged-in user
    teamPin: req.body.teamPin,       // null for personal events, or a pin for team events
    title: req.body.title,
    type: req.body.type,             // 'meetings', 'classes', etc.
    start: req.body.start,
    end: req.body.end,
  };

  await DB.addEvent(newEvent);
  res.send(newEvent);
});

// POST /api/team
// Create a new team
apiRouter.post('/team', verifyAuth, async (req, res) => {
  const newPin = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit PIN
  
  const newTeam = {
    teamPin: newPin,
    name: req.body.name,
    memberIds: [req.user.uid]
  };
  
  await DB.createTeam(newTeam);
  
  // Update User Schema: Add pin to user's team list
  if (!req.user.teamPins) {
    req.user.teamPins = [];
  }
  req.user.teamPins.push(newPin); 
  await DB.updateUser(req.user);
  
  res.send(newTeam);
});

// POST /api/team/join
// Join an existing team using a PIN
apiRouter.post('/team/join', verifyAuth, async (req, res) => {
  const { teamPin } = req.body;
  const team = await DB.getTeam(teamPin);

  if (!team) {
    res.status(404).send({ msg: "Team not found" });
    return;
  }

  // Add user to Team's member list
  if (!team.memberIds.includes(req.user.uid)) {
    team.memberIds.push(req.user.uid);
    await DB.updateTeam(team);
  }

  // Add Team to User's pin list
  if (!req.user.teamPins) {
    req.user.teamPins = [];
  }
  if (!req.user.teamPins.includes(teamPin)) {
    req.user.teamPins.push(teamPin);
    await DB.updateUser(req.user);
  }

  res.send({ msg: "Joined team", team: team });
});

// --------------------------------------------------------------------------
// 4. HELPER FUNCTIONS
// --------------------------------------------------------------------------

// Creates a user matching your Schema
async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  
  const newUser = {
    // Public Schema Fields
    uid: `user_${uuid.v4()}`,
    username: username,
    password: passwordHash,
    token: uuid.v4(),
    teamPins: []
  };

  await DB.createUser(newUser);
  return newUser;
}

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// --------------------------------------------------------------------------
// 5. THIRD PARTY ENDPOINT (Quote)
// --------------------------------------------------------------------------
apiRouter.get('/quote', async (_req, res) => {
  try {
    // 1. Call a third-party API (quotable.io)
    const apiResponse = await fetch('https://api.quotable.io/random');
    
    // 2. Parse the result
    const data = await apiResponse.json();
    
    // 3. Send it to your frontend
    res.send({ quote: data.content, author: data.author });
  } catch (error) {
    // Fallback in case the external API is offline
    res.send({ 
      quote: "The only way to do great work is to love what you do.", 
      author: "Steve Jobs" 
    });
  }
});

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
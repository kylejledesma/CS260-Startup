const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('simon');
const userCollection = db.collection('user');
const teamCollection = db.collection('team');
const eventCollection = db.collection('event');

// Test connection on startup
(async function testConnection() {
    try {
        await db.command({ ping: 1 });
        console.log(`Connect to database`);
    } catch (ex) {
        console.log(`Unable to connect to database with ${url} because ${ex.message}`);
        process.exit(1);
    }
})();

// User functions

function getUser(username) {
    return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

function getUserByIds(userIdList) {
    return userCollection.find({ uid: { $in: userIdList } }).toArray();
}

async function createUser(user) {
    await userCollection.insertOne(user);
}

async function updateUser(user) {
    await userCollection.updateOne({ username: user.username }, { $set: user });
}

// Team functions

function getTeam(teamPin) {
    return teamCollection.findOne({ teamPin: teamPin });
}

async function createTeam(team) {
    await teamCollection.insertOne(team);
}

async function updateTeam(team) {
    await teamCollection.updateOne({ teamPin: team.teamPin }, { $set: team });
}

// Event functions

async function addEvent(event) {
    await eventCollection.insertOne(event);
    return event;
}

function getEvents(query) {
    // query can be ownerId or teamPin etc
    return eventCollection.find(query).toArray();
}

function getEventsByOwnerIds(ownerIdList) {
    return eventCollection.find({ ownerId: { $in: ownerIdList } }).toArray();
}

module.exports = {
  getUser,
  getUserByToken,
  getUserByIds,
  createUser,
  updateUser,
  getTeam,
  createTeam,
  updateTeam,
  addEvent,
  getEvents,
  getEventsByOwnerIds,
};

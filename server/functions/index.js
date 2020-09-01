const functions = require('firebase-functions');
const express = require('express');
const app = express();

const { getAllNotes, getNotesByID } = require('./routes/notes');

app.get('/notes', getAllNotes);
app.get('/notes/:id', getNotesByID);

exports.api = functions.https.onRequest(app);
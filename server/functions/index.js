const functions = require('firebase-functions');
const express = require('express');
const app = express();

const { getAllNotes } = require('./routes/notes');

app.get('/notes', getAllNotes);

exports.api = functions.https.onRequest(app);
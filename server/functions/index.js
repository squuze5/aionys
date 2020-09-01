const functions = require('firebase-functions');
const express = require('express');
const app = express();

const { 
    getAllNotes, 
    getNoteByID,
    addNewNote 
} = require('./routes/notes');

app.get('/notes', getAllNotes);
app.get('/notes/:id', getNoteByID);
app.post('/notes', addNewNote);

exports.api = functions.https.onRequest(app);
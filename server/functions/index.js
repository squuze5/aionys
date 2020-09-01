const functions = require('firebase-functions');
const express = require('express');
const app = express();

const { 
    getAllNotes, 
    getNoteByID,
    addNewNote,
    updateNote
} = require('./routes/notes');

app.get('/notes', getAllNotes);
app.get('/notes/:id', getNoteByID);
app.post('/notes', addNewNote);
app.put('/notes/:id', updateNote);

exports.api = functions.https.onRequest(app);
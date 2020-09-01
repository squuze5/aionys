const functions = require('firebase-functions');
const express = require('express');
const app = express();

const { 
    getAllNotes, 
    getNoteByID,
    addNewNote,
    updateNote,
    deleteNote
} = require('./routes/notes');

app.get('/notes', getAllNotes);
app.get('/notes/:id', getNoteByID);
app.post('/notes', addNewNote);
app.put('/notes/:id', updateNote);
app.delete('/notes/:id', deleteNote);

exports.api = functions.https.onRequest(app);
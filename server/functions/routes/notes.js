const { db } = require('../util/admin');

// GET all Notes
exports.getAllNotes = (req, res) => {
    db
        .collection('notes')
        .orderBy('createdAt', 'desc')
        .get()
        .then(data => {
            let notes = [];

            data.forEach(doc => {
                notes.push({
                    id: doc.id,
                    name: doc.data().name,
                    createdAt: doc.data().createdAt
                });
            });
            return res.status(200).json(notes);
        })
        .catch(error => {
            console.error(error);
            return res.status(500).json({ message: 'Something went wrong!' });
        })
}

// GET Note by ID
exports.getNoteByID = (req, res) => {
    let noteData = {};

    db
        .doc(`/notes/${req.params.id}`)
        .get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    error: 'Not found', 
                    message: 'Note with this ID not found!' 
                });
            }
            noteData = doc.data();
            noteData.id = doc.id;
            
            return res.status(200).json(noteData);
        })
        .catch(error => {
            console.error(error);
            return res.status(500).json({ message: 'Something went wrong!' });
        })
}

// POST New Note
exports.addNewNote = (req, res) => {
    if (req.body.body === '') {
        return res.status(400).json({
            error: 'Bad request',
            message: 'Must not be empty!'
        })
    }

    const newNote = {
        name: req.body.name,
        createdAt: new Date().toISOString()
    };

    db
        .collection('notes')
        .add(newNote)
        .then(doc => {
            res.status(200).json({
                message: `Note with ID ${doc.id} created successfully`
            })
        })
        .catch(error => {
            console.error(error);
            return res.status(500).json({ message: 'Something went wrong!' });
        })
}

// Update note by ID
exports.updateNote = (req, res) => {
    const document = db.doc(`/notes/${req.params.id}`);

    let editNote = {
        name: req.body.name
    };

    if (editNote.name == '') {
        return res.status(400).json({
            error: 'Bad request',
            message: 'Must not be empty!'
        })
    }

    document
        .get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    error: 'Not found',
                    message: 'Note with this ID not found!'
                })
            }

            return document.update(editNote);
        })
        .then(() => {
            res.status(200).json({
                message: 'Note editting successfully!'
            })
        })
        .catch(error => {
            console.error(error);
            return res.status(500).json({ message: 'Something went wrong!' });
        })
}

exports.deleteNote = (req, res) => {
    const document = db.doc(`/notes/${req.params.id}`);

    document
        .get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    error: 'Not found',
                    message: 'Note with this ID not found!'
                })
            }

            return document.delete();
        })
        .then(() => {
            res.status(200).json({
                message: 'Note deleted successfully!'
            })
        })
        .catch(error => {
            console.error(error);
            return res.status(500).json({ message: 'Something went wrong!' });
        })
}
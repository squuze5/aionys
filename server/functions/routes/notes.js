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
exports.getNotesByID = (req, res) => {
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
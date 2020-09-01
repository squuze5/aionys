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
            return res.status(500).json({ message: 'Something went wrong!' });
            console.error(error);
        })
}
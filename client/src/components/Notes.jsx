import React, { Component } from 'react';

const notes = [
    {'id': 2, 'name': 'test'},
    {'id': 3, 'name': 'test2'}
];

class Notes extends Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <div>
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            notes.map(note => {
                                return (
                                    <tr key={note.id}>
                                        <td>{note.id}</td>
                                        <td>{note.name}</td>
                                        <td>
                                            <button type="button" className="btn btn-warning">
                                                    Edit
                                            </button>
                                            <button type="button" className="btn btn-danger">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Notes;
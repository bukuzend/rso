import axios from 'axios';

export const sendNote = () => 
axios.post('http://localhost:8000/notes/add', {
        'title': 'KEBAB228',
        'body': 'TEST1337'
    });

export const getAllNotes = () => 
axios.get('http://localhost:8000/notes/all');

export const deleteNote = (noteTitle) => axios.delete(`http://localhost:8000/notes/delete?title=${noteTitle}`);

export const updateNote = (noteTitle, newBody) => axios.patch(`http://localhost:8000/notes/update?title=${noteTitle}`, {
    "newText": newBody
})


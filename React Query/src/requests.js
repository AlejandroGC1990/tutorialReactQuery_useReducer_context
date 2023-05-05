import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes';

export const getNotes = () =>
    axios.get(baseUrl).then(res => res.data); //se obtienen las notas del servidor

export const createNote = newNote =>
    axios.post(baseUrl, newNote).then(res => res.data) //se almacenan las nuevas notas

export const updateNote = updatedNote =>
    axios.put(`${baseUrl}/${updatedNote.id}`, updatedNote).then(res => res.data) //se actualizan las notas
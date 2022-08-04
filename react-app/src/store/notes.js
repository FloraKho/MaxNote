const GET_NOTES = 'notes/GET_NOTES'
const GET_ONE_NOTE = 'notes/GET_ONE_NOTE'
const GET_NOTEBOOK_NOTES = 'notes/GET_NOTEBOOK_NOTES'
const ADD_NOTE = 'notes/ADD_NOTE'
const EDIT_NOTE = 'notes/EDIT_NOTE'
const DELETE_NOTE = 'notes/DELETE_NOTE'

const getNotes = (notes) => {
    return {
        type: GET_NOTES,
        notes
    }
}

const getOneNote = (note) => {
    return {
        type: GET_ONE_NOTE,
        note
    }
}

const getNotebookNotes = (notes, notebookId) => {
    return {
        type: GET_NOTEBOOK_NOTES,
        notes,
        notebookId
    }
}

const addNote = (note) => {
    return {
        type: ADD_NOTE,
        note
    }
}

const editNote = (note) => {
    return {
        type: EDIT_NOTE,
        note
    }
}

const deleteNote = (noteId) => {
    return {
        type: DELETE_NOTE,
        noteId
    }
}


export const getNotesThunk = () => async (dispatch) => {
    const response = await fetch(`/api/notes`);
    if (response.ok) {
        const notes = await response.json();
        dispatch(getNotes(notes));
    }
}

export const getOneNoteThunk = (noteId) => async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}`);

    if (response.ok) {
        const note = await response.json();
        dispatch(getOneNote(note));
    }
}

export const getNotebookNotesThunk = (notebookId) => async (dispatch) => {
    const response = await fetch(`/api/notebooks/${notebookId}/notes`)
    const notes = await response.json();

    dispatch(getNotebookNotes(notes, notebookId))
}

export const addNoteThunk = (note) => async (dispatch) => {
    const response = await fetch(`/api/notes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note),
    });

    if (response.ok) {
        const newNote = await response.json();
        dispatch(addNote(newNote));
        return newNote;
    }
}

export const editNoteThunk = (note) => async (dispatch) => {
    const response = await fetch(`/api/notes/${note.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note)
    })
    if (response.ok) {
        const newNote = await response.json();
        dispatch(editNote(newNote));
        return newNote;
    }
}

export const deleteNoteThunk = (noteId) => async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(deleteNote(noteId));
    }
}



const initialState = {singleNote:[]};

const noteReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ONE_NOTE:
            newState = { ...state };
            newState[action.note.id] = action.note;
            return newState;
        case GET_NOTES:
            newState = {};
            action.notes.Notes.forEach(note => {
                newState[note.id] = note;
            });
            return newState;
        case GET_NOTEBOOK_NOTES:
            newState = {}
            action.notes.Notes.forEach((note) => {
                newState[note.id] = note
            })
            return newState;
        case ADD_NOTE:
            return {
                ...state,
                [action.note.id]: action.note
            };
        case EDIT_NOTE:
            return {
                ...state,
                [action.note.id]: action.note
            };
        case DELETE_NOTE:
            newState = { ...state }
            delete newState[action.noteId];
            return newState;
        default:
            return state;
    }
}

export default noteReducer;
const GET_NOTEBOOKS = 'notebooks/GET_NOTEBOOKS'
const ADD_NOTEBOOK = 'notebooks/ADD_NOTEBOOK'
const EDIT_NOTEBOOK = 'notebooks/EDIT_NOTEBOOK'
const DELETE_NOTEBOOK = 'notebooks/DELETE_NOTEBOOK'

const getNotebooks = (notebooks) => {
    return {
        type: GET_NOTEBOOKS,
        notebooks
    }
}

const addNotebook = (notebook) => {
    return {
        type: ADD_NOTEBOOK,
        notebook
    }
}

const editNotebook = (notebook) => {
    return {
        type: EDIT_NOTEBOOK,
        notebook
    }
}

const deleteNotebook = (notebookId) => {
    return {
        type: DELETE_NOTEBOOK,
        notebookId
    }
}

export const getNotebooksThunk = () => async (dispatch) => {
    const response = await fetch(`/api/notebooks`);
    if (response.ok) {
        const notebooks = await response.json();
        dispatch(getNotebooks(notebooks));
    } 
}

export const addNotebookThunk = (notebook) => async (dispatch) => {
    const response = await fetch(`/api/notebooks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(notebook),
    });

    if (response.ok) {
        const newNotebook = await response.json();
        dispatch(addNotebook(newNotebook));
        return newNotebook;
    }
}

export const editNotebookThunk = (notebook) => async (dispatch) => {
    const response = await fetch(`/api/notebooks/${notebook.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notebook)
    })
    if (response.ok) {
        const newNotebook = await response.json();
        dispatch(editNotebook(newNotebook));
        return newNotebook;
    }
}

export const deleteNotebookThunk = (notebookId) => async (dispatch) => {
    const response = await fetch(`/api/notebooks/${notebookId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(deleteNotebook(notebookId));
    }
}



const initialState = {};

const notebookReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_NOTEBOOKS:
            newState = {};
            action.notebooks.Notebooks.forEach(notebook => {
                newState[notebook.id] = notebook;
            });
            return newState;
        case ADD_NOTEBOOK:
            return {
                ...state,
                [action.notebook.id]: action.notebook
            };
        case EDIT_NOTEBOOK:
            return {
                ...state,
                [action.notebook.id]: action.notebook
            };
        case DELETE_NOTEBOOK:
            newState = { ...state }
            delete newState[action.notebookId];
            return newState;
        default:
            return state;
    }
}

export default notebookReducer;
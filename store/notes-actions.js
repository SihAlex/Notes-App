export const CREATE_NOTE = 'CREATE_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';

export const createNote = ({ title, content }) => {
  return { type: CREATE_NOTE, noteData: { title, content } };
};

export const editNote = ({ id, title, content }) => {
  return { type: EDIT_NOTE, noteData: { id, title, content } };
};

export const deleteNote = ({ id }) => {
  return { type: DELETE_NOTE, noteData: { id } };
};

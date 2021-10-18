import { Note } from '../models/Note';
import * as actions from './notes-actions';

const initialState = {
  notes: [],
  isLoggedIn: false,
  errors: {
    login: '',
    register: '',
  },
};

const getDate = () => {
  const date = new Date();
  const dd = date.getDate();
  const mm = date.getMonth();
  const yy = date.getFullYear();
  const dateString = `${dd < 10 ? '0' + dd : dd}/${
    mm < 10 ? '0' + mm : mm
  }/${yy}`;
  return { date, dateString };
};

export default (state = initialState, action) => {
  const { date, dateString } = getDate();
  switch (action.type) {
    case actions.CREATE_NOTE: {
      const newNote = new Note(
        date,
        action.noteData.title,
        action.noteData.content,
        dateString
      );
      return {
        ...state,
        notes: state.notes.concat(newNote),
      };
    }
    case actions.EDIT_NOTE:
      {
        const noteIndex = state.notes.findIndex(
          (note) => note.id === action.noteData.id
        );
        if (noteIndex > -1) {
          const title = action.noteData.title;
          const content = action.noteData.content;

          return {
            ...state,
            notes: state.notes.map((note, index) =>
              index === noteIndex
                ? {
                    ...note,
                    title,
                    content,
                    date: dateString,
                  }
                : note
            ),
          };
        }
      }
      return state;
    case actions.DELETE_NOTE:
      const noteIndex = state.notes.findIndex(
        (note) => note.id === action.noteData.id
      );
      if (noteIndex > -1) {
        return {
          ...state,
          notes: state.notes.filter((note) => note.id !== action.noteData.id),
        };
      }
      return state;
    case actions.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        errors: {
          login: '',
          register: '',
        },
      };
    case actions.LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        errors: {
          login: action.error,
          register: '',
        },
      };
    case actions.REGISTER_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        errors: {
          login: '',
          register: action.error,
        },
      };
    case actions.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        errors: {
          login: '',
          register: '',
        },
      };
    default:
      return state;
  }
};

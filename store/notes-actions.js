import { loginUser, registerUser, logoutUser } from '../firebase/firebase';

export const CREATE_NOTE = 'CREATE_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const LOGOUT = 'LOGOUT';

export const createNote = ({ title, content }) => {
  return { type: CREATE_NOTE, noteData: { title, content } };
};

export const editNote = ({ id, title, content }) => {
  return { type: EDIT_NOTE, noteData: { id, title, content } };
};

export const deleteNote = ({ id }) => {
  return { type: DELETE_NOTE, noteData: { id } };
};

export const login = ({ email, password }) => {
  return (dispatch) => {
    loginUser(email, password)
      .then(() => {
        console.log('User signed in!');
        dispatch(loginSucceeded());
      })
      .catch((error) => {
        let message = 'Error!';
        if (error.code === 'auth/invalid-email') {
          message = 'That email address is invalid!';
        }

        if (error.code === 'auth/wrong-password') {
          message = 'That password is wrong!';
        }

        console.error(error);
        dispatch(loginFailed(message));
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    logoutUser().then(() => {
      dispatch(logoutAction());
    });
  };
};

const loginSucceeded = () => ({ type: LOGIN });
const loginFailed = (error) => ({ type: LOGIN_FAILURE, error });
const logoutAction = () => ({ type: LOGOUT });

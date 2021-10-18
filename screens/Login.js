import React, { useReducer } from 'react';
import { useDispatch } from 'react-redux';
import * as notesActions from '../store/notes-actions';
import { Button, StyleSheet, Text, TextInput } from 'react-native';
import { Colors } from '../constants/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const CHANGE_EMAIL = 'CHANGE_EMAIL';
const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
const TOUCH_EMAIL = 'TOUCH_EMAIL';
const TOUCH_PASSWORD = 'TOUCH_PASSWORD';

const formReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_EMAIL:
      return {
        ...state,
        email: {
          text: action.text,
          validity: validateEmail(action.text),
        },
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        password: {
          text: action.text,
          validity: action.text.trim().length > 4,
        },
      };
    case TOUCH_EMAIL:
      return {
        ...state,
        isEmailTouched: true,
      };
    case TOUCH_PASSWORD:
      return {
        ...state,
        isPasswordTouched: true,
      };
    default:
      return state;
  }
};

const initialState = {
  email: {
    text: '',
    validity: false,
  },
  password: {
    text: '',
    validity: false,
  },
  isEmailTouched: false,
  isPasswordTouched: false,
};

const validateEmail = (email) => {
  if (email.length > 0) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  return false;
};

const Login = (props) => {
  const [state, dispatchFormAction] = useReducer(formReducer, initialState);

  const dispatch = useDispatch();

  const changeEmailHandler = (text) => {
    dispatchFormAction({ type: CHANGE_EMAIL, text });
  };
  const changePasswordHandler = (text) => {
    dispatchFormAction({ type: CHANGE_PASSWORD, text });
  };
  const onEmailBlurHandler = () => {
    dispatchFormAction({ type: TOUCH_EMAIL });
  };
  const onPasswordBlurHandler = () => {
    dispatchFormAction({ type: TOUCH_PASSWORD });
  };
  const submitHandler = () => {
    if (state.email.validity && state.password.validity) {
      dispatch(
        notesActions.login({
          email: state.email.text,
          password: state.password.text,
        })
      );
    }
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      style={styles.screen}
      enableOnAndroid
      extraScrollHeight={30}
    >
      <Text style={styles.inputLabel}>Email:</Text>
      <TextInput
        style={
          state.isEmailTouched && !state.email.validity
            ? { ...styles.textInput, ...styles.errorInput }
            : styles.textInput
        }
        value={state.email.text}
        onChangeText={changeEmailHandler}
        onBlur={onEmailBlurHandler}
        keyboardType="email-address"
      />
      <Text style={styles.inputLabel}>Password:</Text>
      <TextInput
        style={
          state.isPasswordTouched && !state.password.validity
            ? { ...styles.textInput, ...styles.textBox, ...styles.errorInput }
            : { ...styles.textInput, ...styles.textBox }
        }
        textContentType="password"
        value={state.password.text}
        onChangeText={changePasswordHandler}
        onBlur={onPasswordBlurHandler}
      />
      <Button title="OK" color={Colors.primary} onPress={submitHandler} />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 15,
  },
  inputLabel: {
    color: 'black',
    fontSize: 20,
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 20,
    padding: 5,
    marginVertical: 20,
    borderRadius: 5,
  },
  textBox: {
    textAlignVertical: 'top',
  },
  errorInput: {
    borderColor: Colors.error,
  },
});

export default Login;

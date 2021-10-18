import React, { useState, useEffect } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { MainNavigator, AuthNavigator } from './navigation/Navigators';

import auth from '@react-native-firebase/auth';

import notesReducer from './store/notes-reducer';
import { MenuProvider } from 'react-native-popup-menu';

const store = createStore(notesReducer, applyMiddleware(thunk));

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = (u) => {
    setUser(u);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <Provider store={store}>
      <MenuProvider>
        {user ? <MainNavigator /> : <AuthNavigator />}
      </MenuProvider>
    </Provider>
  );
};

export default App;

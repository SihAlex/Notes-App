import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import MainNavigator from './navigation/MainNavigator';

import notesReducer from './store/notes-reducer';
import { MenuProvider } from 'react-native-popup-menu';

const store = createStore(notesReducer);

const App = () => {
  return (
    <Provider store={store}>
      <MenuProvider>
        <MainNavigator />
      </MenuProvider>
    </Provider>
  );
};

export default App;

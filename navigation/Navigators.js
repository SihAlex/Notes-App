import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NotesScreen from '../screens/NotesScreen';
import CreateNoteScreen from '../screens/CreateNoteScreen';
import NoteContentScreen from '../screens/NoteContentScreen';

import { Colors } from '../constants/Colors';

import Login from '../screens/Login';

export const SCREENS = {
  CreateNoteScreen: 'CreateNote',
  NoteContentScreen: 'Note Content',
};

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: 'white',
};

export const AuthNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={screenOptions}>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Notes" screenOptions={screenOptions}>
        <Stack.Screen name="Notes" component={NotesScreen} />
        <Stack.Screen
          name="CreateNote"
          component={CreateNoteScreen}
          options={({ route }) => ({
            title: route.params ? 'Edit Note' : 'Create Note',
            headerStyle: {
              backgroundColor: Colors.secondary,
            },
          })}
        />
        <Stack.Screen
          name="Note Content"
          component={NoteContentScreen}
          options={({ route }) => ({ title: route.params.title })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

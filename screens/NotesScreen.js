import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as notesActions from '../store/notes-actions';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Text,
  Alert,
} from 'react-native';
import NoteListItem from '../components/NoteListItem';
import PulsatingButton from '../components/PulsatingButton';

import { SCREENS } from '../navigation/MainNavigator';

const NotesScreen = (props) => {
  const navigation = props.navigation;

  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  const renderListItem = (itemData) => {
    const { id, title, content, date } = itemData.item;

    const editNoteHandler = () => {
      props.navigation.navigate(SCREENS.CreateNoteScreen, {
        id: id,
        title: {
          text: title,
          validity: title.trim().length > 0,
        },
        content: {
          text: content,
          validity: content.trim().length > 0,
        },
      });
    };

    const deleteNoteHandler = () => {
      Alert.alert('Delete note?', 'Do you want to delete the note?', [
        {
          text: 'Yes',
          onPress: () => {
            dispatch(notesActions.deleteNote({ id }));
          },
        },
        { text: 'No' },
      ]);
    };

    return (
      <NoteListItem
        id={id}
        title={title}
        content={content}
        date={date}
        onPress={() => {
          navigation.navigate(SCREENS.NoteContentScreen, {
            title,
            content,
            date,
          });
        }}
        onEdit={editNoteHandler}
        onDelete={deleteNoteHandler}
      />
    );
  };

  const createNewNoteHandler = () => {
    navigation.navigate(SCREENS.CreateNoteScreen);
  };

  return (
    <View style={styles.screen}>
      {notes.length === 0 ? (
        <View style={styles.emptyScreen}>
          <PulsatingButton onPress={createNewNoteHandler} title="+" />
          <Text style={styles.emptyScreenText}>
            No notes have been detected.
          </Text>
        </View>
      ) : (
        <>
          <FlatList data={notes} renderItem={renderListItem} />
          <View
            style={
              notes.length === 0
                ? styles.buttonContainerEmpty
                : styles.buttonContainerWithNotes
            }
          >
            <PulsatingButton
              style={styles.buttonContainerWithNotes}
              title="+"
              onPress={createNewNoteHandler}
            />
          </View>
        </>
      )}
    </View>
  );
};

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  buttonContainerEmpty: {
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    top: width * 0.5,
    right: 0,
    bottom: 0,
  },
  buttonContainerWithNotes: {
    position: 'absolute',
    alignItems: 'flex-end',
    left: 0,
    top: width,
    right: 0,
    bottom: 0,
    paddingRight: 10,
  },
  emptyScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyScreenText: {
    color: 'black',
    paddingTop: 20,
  },
});

export default NotesScreen;

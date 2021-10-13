import React from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { Colors } from '../constants/Colors';

const NoteContentScreen = ({ route }) => {
  const { content } = route.params;

  return (
    <ScrollView style={styles.contentContainer}>
      <Text style={styles.content}>{content}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: Colors.primary,
  },
  contentContainer: {
    padding: 15,
  },
  title: { color: 'white' },
  content: { color: 'black', fontSize: 20 },
});

export default NoteContentScreen;

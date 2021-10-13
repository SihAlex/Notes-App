import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';

import MenuComponent from './MenuComponent';

const NoteListItem = (props) => {
  const { title, date, onPress, onEdit, onDelete } = props;

  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <TouchableComponent onPress={onPress}>
      <View style={styles.note}>
        <Text style={styles.text} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.text}>{date}</Text>
        <MenuComponent onEdit={onEdit} onDelete={onDelete} />
      </View>
    </TouchableComponent>
  );
};

const styles = StyleSheet.create({
  note: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
  },
  text: {
    color: 'black',
    overflow: 'hidden',
    width: '30%',
  },
});

export default NoteListItem;

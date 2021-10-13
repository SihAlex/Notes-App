import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import { Colors } from '../constants/Colors';

const EDIT = 'EDIT';
const DELETE = 'DELETE';

const MenuComponent = (props) => {
  return (
    <Menu
      onSelect={(value) => {
        switch (value) {
          case EDIT: {
            props.onEdit();
            break;
          }
          case DELETE: {
            props.onDelete();
            break;
          }
        }
      }}
    >
      <MenuTrigger>
        <View style={{ padding: 10 }}>
          <Text style={{ color: Colors.primary }}>More</Text>
        </View>
      </MenuTrigger>
      <MenuOptions>
        <MenuOption value={EDIT}>
          <Text onPress={props.onEdit} style={{ color: Colors.secondary }}>
            Edit
          </Text>
        </MenuOption>
        <MenuOption onPress={props.onDelete} value={DELETE}>
          <Text style={{ color: Colors.error }}>Delete</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};

const styles = StyleSheet.create({});

export default MenuComponent;

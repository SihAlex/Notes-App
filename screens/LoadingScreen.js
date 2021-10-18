import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Colors } from '../constants/Colors';

import auth from '@react-native-firebase/auth';

const LoadingScreen = (props) => {
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    if (initializing) {
      setInitializing(false);
    }
    if (user) {
      props.navigation.replace('Notes');
    } else {
      props.navigation.replace('Login');
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen;

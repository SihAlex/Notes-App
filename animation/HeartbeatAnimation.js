import { Animated } from 'react-native';

export const HeartbeatAnimation = (value, minValue, maxValue) =>
  Animated.loop(
    Animated.sequence([
      Animated.timing(value, {
        toValue: maxValue,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(value, {
        toValue: minValue,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(value, {
        toValue: maxValue,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(value, {
        toValue: minValue,
        duration: 2000,
        useNativeDriver: false,
      }),
    ])
  );

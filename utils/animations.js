import { Animated, Easing, Platform } from 'react-native';

const USE_NATIVE_DRIVER = Platform.OS !== 'web';

export const animations = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  fadeOut: {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },
  fadeInUp: {
    from: { opacity: 0, translateY: 20 },
    to: { opacity: 1, translateY: 0 },
  },
  fadeInDown: {
    from: { opacity: 0, translateY: -20 },
    to: { opacity: 1, translateY: 0 },
  },
  fadeInLeft: {
    from: { opacity: 0, translateX: -20 },
    to: { opacity: 1, translateX: 0 },
  },
  fadeInRight: {
    from: { opacity: 0, translateX: 20 },
    to: { opacity: 1, translateX: 0 },
  },

  zoomIn: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
  },
  zoomOut: {
    from: { opacity: 1, scale: 1 },
    to: { opacity: 0, scale: 0.8 },
  },
  pulse: {
    0: { scale: 1 },
    0.5: { scale: 1.05 },
    1: { scale: 1 },
  },
  bounce: {
    0: { translateY: 0 },
    0.5: { translateY: -10 },
    1: { translateY: 0 },
  },

  slideInLeft: {
    from: { translateX: -300 },
    to: { translateX: 0 },
  },
  slideInRight: {
    from: { translateX: 300 },
    to: { translateX: 0 },
  },
  slideInUp: {
    from: { translateY: 300 },
    to: { translateY: 0 },
  },
  slideInDown: {
    from: { translateY: -300 },
    to: { translateY: 0 },
  },

  shake: {
    0: { translateX: 0 },
    0.25: { translateX: -10 },
    0.5: { translateX: 10 },
    0.75: { translateX: -10 },
    1: { translateX: 0 },
  },
  swing: {
    0: { rotate: '0deg' },
    0.2: { rotate: '15deg' },
    0.4: { rotate: '-10deg' },
    0.6: { rotate: '5deg' },
    0.8: { rotate: '-5deg' },
    1: { rotate: '0deg' },
  },
  flash: {
    0: { opacity: 1 },
    0.25: { opacity: 0 },
    0.5: { opacity: 1 },
    0.75: { opacity: 0 },
    1: { opacity: 1 },
  },
};

export const createFadeAnimation = (animatedValue, toValue = 1, duration = 300) => {
  return Animated.timing(animatedValue, {
    toValue,
    duration,
    easing: Easing.ease,
    useNativeDriver: USE_NATIVE_DRIVER,
  });
};

export const createSlideAnimation = (animatedValue, toValue = 0, duration = 300) => {
  return Animated.spring(animatedValue, {
    toValue,
    friction: 8,
    tension: 40,
    useNativeDriver: USE_NATIVE_DRIVER,
  });
};

export const createScaleAnimation = (animatedValue, toValue = 1, duration = 300) => {
  return Animated.spring(animatedValue, {
    toValue,
    friction: 6,
    tension: 40,
    useNativeDriver: USE_NATIVE_DRIVER,
  });
};

export const createPulseAnimation = (animatedValue, duration = 1000) => {
  return Animated.loop(
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1.1,
        duration: duration / 2,
        easing: Easing.ease,
        useNativeDriver: USE_NATIVE_DRIVER,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: duration / 2,
        easing: Easing.ease,
        useNativeDriver: USE_NATIVE_DRIVER,
      }),
    ])
  );
};

export const createShakeAnimation = (animatedValue) => {
  return Animated.sequence([
    Animated.timing(animatedValue, {
      toValue: -10,
      duration: 50,
      useNativeDriver: USE_NATIVE_DRIVER,
    }),
    Animated.timing(animatedValue, {
      toValue: 10,
      duration: 50,
      useNativeDriver: USE_NATIVE_DRIVER,
    }),
    Animated.timing(animatedValue, {
      toValue: -10,
      duration: 50,
      useNativeDriver: USE_NATIVE_DRIVER,
    }),
    Animated.timing(animatedValue, {
      toValue: 10,
      duration: 50,
      useNativeDriver: USE_NATIVE_DRIVER,
    }),
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 50,
      useNativeDriver: USE_NATIVE_DRIVER,
    }),
  ]);
};

export const createStaggerAnimation = (animatedValues, staggerDelay = 100, duration = 300) => {
  return Animated.stagger(
    staggerDelay,
    animatedValues.map((value) =>
      Animated.timing(value, {
        toValue: 1,
        duration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: USE_NATIVE_DRIVER,
      })
    )
  );
};

export const createRotationAnimation = (animatedValue, duration = 1000) => {
  return Animated.loop(
    Animated.timing(animatedValue, {
      toValue: 1,
      duration,
      easing: Easing.linear,
      useNativeDriver: USE_NATIVE_DRIVER,
    })
  );
};

export const createBounceAnimation = (animatedValue) => {
  return Animated.sequence([
    Animated.timing(animatedValue, {
      toValue: -20,
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: USE_NATIVE_DRIVER,
    }),
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      easing: Easing.bounce,
      useNativeDriver: USE_NATIVE_DRIVER,
    }),
  ]);
};

export const createParallaxStyle = (scrollY, height, multiplier = 0.5) => {
  return {
    transform: [
      {
        translateY: scrollY.interpolate({
          inputRange: [-height, 0],
          outputRange: [height * multiplier, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
  };
};

export const createHeaderCollapseStyle = (scrollY, headerHeight) => {
  return {
    height: scrollY.interpolate({
      inputRange: [0, headerHeight],
      outputRange: [headerHeight, 0],
      extrapolate: 'clamp',
    }),
    opacity: scrollY.interpolate({
      inputRange: [0, headerHeight / 2, headerHeight],
      outputRange: [1, 0.5, 0],
      extrapolate: 'clamp',
    }),
  };
};

export const easingPresets = {
  linear: Easing.linear,
  easeIn: Easing.in(Easing.ease),
  easeOut: Easing.out(Easing.ease),
  easeInOut: Easing.inOut(Easing.ease),
  bounce: Easing.bounce,
  elastic: Easing.elastic(1),
  back: Easing.back(1.5),
  bezier: Easing.bezier(0.25, 0.1, 0.25, 1),
};

export const durationPresets = {
  instant: 100,
  fast: 200,
  normal: 300,
  slow: 500,
  verySlow: 800,
};

export const springConfigs = {
  gentle: {
    friction: 20,
    tension: 40,
  },
  wobbly: {
    friction: 7,
    tension: 40,
  },
  stiff: {
    friction: 12,
    tension: 180,
  },
  slow: {
    friction: 26,
    tension: 40,
  },
};

export const interpolateColor = (animatedValue, inputRange, colors) => {
  return animatedValue.interpolate({
    inputRange,
    outputRange: colors,
    extrapolate: 'clamp',
  });
};

export default {
  animations,
  createFadeAnimation,
  createSlideAnimation,
  createScaleAnimation,
  createPulseAnimation,
  createShakeAnimation,
  createStaggerAnimation,
  createRotationAnimation,
  createBounceAnimation,
  createParallaxStyle,
  createHeaderCollapseStyle,
  easingPresets,
  durationPresets,
  springConfigs,
  interpolateColor,
};

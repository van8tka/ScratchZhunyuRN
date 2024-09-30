import React, {useEffect} from 'react';
import {Platform, View, Image, StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  ComposedGesture, Gesture,
  GestureDetector,
  GestureHandlerRootView, GestureType
} from "react-native-gesture-handler";

function App(): React.JSX.Element {
  useEffect(() => {
    Platform.OS === 'ios'
      ? SplashScreen.hide()
      : setTimeout(() => SplashScreen.hide(), 1000);
  }, []);

  function onBeginGestureHandler() {
    console.log('begin');
  }

  function onTouchesMoveGestureHandler() {
    console.log('move');
  }

  function onEndGestureHandler() {
    console.log('end');
  }

  const handleGesture = Gesture.Tap()
    .onBegin(onBeginGestureHandler)
    .onTouchesMove(onTouchesMoveGestureHandler)
    .onEnd(onEndGestureHandler);

  return (
    <GestureHandlerRootView style={styles.gesture}>
      <View style={styles.container}>
        <GestureDetector gesture={handleGesture}>
          <Image
            source={require('./assets/images/zhunya.png')}
            style={styles.image}
            resizeMode="cover"
          />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gesture: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    backgroundColor: Colors.gray,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});

export default App;

import React, {useEffect} from 'react';
import {Platform, View, StyleSheet, ImageBackground} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Sound from 'react-native-sound';

Sound.setCategory('Playback');

const audio = new Sound(require('./assets/media/myr.mp3'), error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }

  console.log('sound loaded');
});

function App(): React.JSX.Element {
  useEffect(() => {
    Platform.OS === 'ios'
      ? SplashScreen.hide()
      : setTimeout(() => SplashScreen.hide(), 1000);

    audio.setVolume(1);

    return () => {
      console.log('release media');
      audio.release();
    };
  }, []);

  function onTouchesMoveGestureHandler() {
    console.log('move');
    startPlayMediaHandler();
  }

  function onEndGestureHandler() {
    console.log('end');
    endPlayMediaHandler();
  }

  function startPlayMediaHandler() {
    audio.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  }

  function endPlayMediaHandler() {
    audio.stop();
  }

  const handleGesture = Gesture.Pan()
    .onTouchesMove(onTouchesMoveGestureHandler)
    .onEnd(onEndGestureHandler);

  return (
    <GestureHandlerRootView style={styles.gesture}>
      <ImageBackground
        source={require('./assets/images/zhunya.png')}
        style={styles.image}
        resizeMode="cover">
        <GestureDetector gesture={handleGesture}>
          <View style={styles.shadow} />
        </GestureDetector>
      </ImageBackground>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gesture: {
    flex: 1,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  shadow: {
    marginTop: '48%',
    marginLeft: '14%',
    transform: [{rotate: '-18deg'}],
    height: '62%',
    width: '65%',
  },
});

export default App;

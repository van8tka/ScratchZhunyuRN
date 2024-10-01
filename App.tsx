import React, {useEffect, useState} from 'react';
import {Platform, View, Image, StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Colors} from 'react-native/Libraries/NewAppScreen';
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

  const handleGesture = Gesture.Tap()
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

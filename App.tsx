import React, {useEffect} from 'react';
import {Platform, View, Image} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  useEffect(() => {
    Platform.OS === 'ios'
      ? SplashScreen.hide()
      : setTimeout(() => SplashScreen.hide(), 1000);
  }, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        backgroundColor: Colors.gray,
      }}>
      <Image
        source={require('./assets/images/zhunya.png')}
        style={{height: '100%', width: '100%'}}
        resizeMode="cover"
      />
    </View>
  );
}

export default App;

import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import GlobalStyles from './utils/GlobalStyles';
import List from './components/List';
import {Settings} from 'react-native-feather';

const App = () => {
  return (
    <>
      <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
        <StatusBar
          backgroundColor="orange"
          barStyle="light-content"
        ></StatusBar>
        <View style={styles.header}>
          <ImageBackground
            source={require('./assets/kitten.jpg')}
            style={styles.bgImage}
            imageStyle={{borderBottomRightRadius: 65}}
          ></ImageBackground>
          <Settings
            stroke="orange"
            width={32}
            height={32}
            style={styles.icon}
          ></Settings>
          <Text style={styles.text}>Homeless Kittens</Text>
        </View>
        <List></List>
      </SafeAreaView>
      <StatusBar style="auto" />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 300,
    backgroundColor: 'white',
  },
  bgImage: {
    width: '100%',
    height: 280,
  },
  text: {
    position: 'absolute',
    bottom: 40,
    color: 'white',
    backgroundColor: '#ffa66c',
    fontSize: 24,
    padding: 10,
  },
  icon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default App;

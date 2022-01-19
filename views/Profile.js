import React, {useContext} from 'react';
import {StyleSheet, SafeAreaView, Text, Button} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const {setIsLoggedIn} = useContext(MainContext);
  const logOut = async () => {
    try {
      await AsyncStorage.clear();
    } catch (err) {
      console.log(err);
    }
    setIsLoggedIn(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <Button title="Log out!" onPress={logOut}></Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

export default Profile;

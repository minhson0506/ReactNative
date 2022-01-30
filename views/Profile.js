import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, Text, Button, Image} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';

const Profile = () => {
  const {setIsLoggedIn, user} = useContext(MainContext);
  const {getFileByTag, postTag} = useTag();
  const [avatar, setAvatar] = useState('http://placekitten.com/640');

  const fetchAvatar = async () => {
    try {
      const avatarArray = await getFileByTag('avatar_' + user.user_id);
      const avatar = avatarArray.pop();
      console.log('TAG' + JSON.stringify(avatar));
      setAvatar(uploadsUrl + avatar.filename);
    } catch (err) {
      console.error(err.message);
    }
  };

  // const createAvatar = async (mediaId) => {
  //   const data = {file_id: mediaId, tag: 'avatar_' + user.user_id};
  //   try {
  //     const result = await postTag(data, 'token');
  //     console.log('create avatar' + result);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  useEffect(() => {
    fetchAvatar();
    //createAvatar(95); // just for testing
  }, []);

  const logOut = async () => {
    try {
      await AsyncStorage.clear();
    } catch (err) {
      console.error(err);
    }
    setIsLoggedIn(false);
  };

  console.log('Profile', user);
  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <Text>{user.username}</Text>
      <Image
        source={{uri: avatar}}
        style={{width: '90%', height: '80%'}}
        resizeMode="contain"
      ></Image>
      <Text>{user.email}</Text>
      <Text>{user.full_name}</Text>
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

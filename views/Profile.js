import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';
import {Avatar, Button, Card, ListItem, Text} from 'react-native-elements';
import {PropTypes} from 'prop-types';

const Profile = ({navigation}) => {
  const {setIsLoggedIn, user} = useContext(MainContext);
  const {getFileByTag} = useTag();
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

  // const logOut = async () => {
  //   try {
  //     await AsyncStorage.clear();
  //   } catch (err) {
  //     console.error(err);
  //   }
  //   setIsLoggedIn(false);
  // };

  console.log('Profile', user);
  return (
    <ScrollView>
      <Card>
        <Card.Title>
          <Text h1>{user.username}</Text>
        </Card.Title>
        <Card.Image
          source={{uri: avatar}}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator />}
        />
        <ListItem>
          <Avatar icon={{name: 'email', color: 'black'}} />
          <Text>{user.email}</Text>
        </ListItem>
        <ListItem>
          <Avatar icon={{name: 'user', type: 'font-awesome', color: 'black'}} />
          <Text>{user.full_name}</Text>
        </ListItem>
        <Button
          title="Log out!"
          onPress={async () => {
            await AsyncStorage.clear();
            setIsLoggedIn(false);
          }}
        />
        <Button
          title="Modify user"
          onPress={() => {
            navigation.navigate('Modify user');
          }}
        />
        <Button
          title="My Files"
          onPress={() => {
            navigation.navigate('My Files');
          }}
        ></Button>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {width: '100%', height: undefined, aspectRatio: 1},
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;

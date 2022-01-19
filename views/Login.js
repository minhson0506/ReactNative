import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const {setIsLoggedIn} = useContext(MainContext);

  const checkToken = async () => {
    // TODO: save the value of userToken saved in AsyncStorage as userToken
    let userToken = null;
    try {
      userToken = await AsyncStorage.getItem('userToken');
    } catch (err) {
      console.log(err);
    }
    console.log('token', userToken);
    // TODO if the content of userToken is 'abc'), set isLoggedIn to true and navigate to Tabs
    if (userToken === 'abc') {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  // props is needed for navigation
  const logIn = async () => {
    console.log('Button pressed');
    //call Api with user and get token as response
    //now we use a dummy token
    try {
      await AsyncStorage.setItem('userToken', 'abc');
    } catch (err) {
      console.log(err);
    }
    setIsLoggedIn(true);
  };
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title="Sign in!" onPress={logIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;

import React, {useContext, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogin, useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {postLogin} = useLogin();
  const {getUserByToken} = useUser();

  const checkToken = async () => {
    // TODO: save the value of userToken saved in AsyncStorage as userToken
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (!userToken) return;
      console.log('token', userToken);
      const userData = await getUserByToken(userToken);
      console.log('checkToken', userData);
      setUser(userData);
      setIsLoggedIn(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  // props is needed for navigation
  // const logIn = async () => {
  //   console.log('Button pressed');
  //   // hard code user and pass
  //   const data = {username: 'SonDang', password: '123456a@'};
  //   // call postlogin
  //   try {
  //     const userData = await postLogin(data);
  //     // if login sucessfull fo the following
  //     //call Api with user and get token as response
  //     await AsyncStorage.setItem('userToken', userData.token);
  //     setIsLoggedIn(true);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  return (
    <TouchableOpacity
      style={{flex: 1}}
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={styles.container}
      >
        <Text>Login</Text>
        <LoginForm></LoginForm>
        <RegisterForm></RegisterForm>
        {/* <Button title="Sign in!" onPress={logIn} /> */}
      </KeyboardAvoidingView>
    </TouchableOpacity>
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

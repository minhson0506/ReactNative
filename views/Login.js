import React, {useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {getUserByToken} = useUser();

  const checkToken = async () => {
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

import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
  View,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {ButtonGroup, Card} from 'react-native-elements';
// import Logo from '../assets/logo.svg';
import LottieView from 'lottie-react-native';

const Login = ({navigation}) => {
  const animation = React.createRef();
  const [formToggle, setFormToggle] = useState(true);
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
    animation.current?.play();
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
        <ScrollView contentContainerStyle={styles.container}>
          <Card>
            <Card.Image style={styles.fakeImage}>
              {/* <Logo /> */}
              <LottieView
                ref={animation}
                source={require('../assets/lottie-animation.json')}
                style={styles.animation}
                loop={false}
              />
            </Card.Image>
            <ButtonGroup
              onPress={() => setFormToggle(!formToggle)}
              selectedIndex={formToggle ? 0 : 1}
              buttons={['Login', 'Register']}
            />
          </Card>
          {formToggle ? (
            <Card>
              <Card.Title h4>Login</Card.Title>
              <Card.Divider />
              <LoginForm />
            </Card>
          ) : (
            <Card>
              <Card.Title h4>Register</Card.Title>
              <Card.Divider />
              <RegisterForm setFormToggle={setFormToggle} />
            </Card>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  FlexGrowOne: {
    flexGrow: 1,
  },
  container: {
    padding: 16,
  },
  animation: {
    justifyContent: 'center',
    flex: 1,
  },
  fakeImage: {
    backgroundColor: '#fff',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;

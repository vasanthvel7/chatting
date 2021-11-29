import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Button} from 'react-native-elements';

import firebase from 'firebase/compat/app';
import {getFirestore, collection, getDocs} from 'firebase/firestore/lite';
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const firebaseConfig = {
    apiKey: 'AIzaSyB3ob2o2yfDFXShvGm9y_CUzR1Pvd5WX_A',
    authDomain: 'glocl-dfbc8.firebaseapp.com',
    databaseURL: 'https://glocl-dfbc8-default-rtdb.firebaseio.com',
    projectId: 'glocl-dfbc8',
    storageBucket: 'glocl-dfbc8.appspot.com',
    messagingSenderId:
      '1081089537459-ggt7084tutnk8bf2g1nl1ai9kcc3g0qi.apps.googleusercontent.com',
  };
  const Firebase = async (user, loginSuccess, loginFailed) => {
    await firebase
      .initializeApp(firebaseConfig)
      .auth()

      .signInWithEmailAndPassword(user.email, user.password)
      .then(loginSuccess, loginFailed);
    const db = firebase.firestore();
    const userRef = db.collection('user');
    userRef.doc('WHd7xAFMMieC6Tk8Rke6tCwoP6y1').set({
      uid: 'WHd7xAFMMieC6Tk8Rke6tCwoP6y1',
      displayName: 'vasanth',
      photoURL:
        'https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x',
      email: 'test123@gmail.com',
    });
  };
  const onPressLogin = async () => {
    const user = {
      email: email,
      password: password,
      firebase: firebaseConfig,
    };
    Firebase(user, loginSuccess, loginFailed);
  };

  const loginSuccess = () => {
    console.log('login successful, navigate to chat.');
    navigation.replace('Chat', {name: 'vasanth'});
  };
  const loginFailed = () => {
    alert('Login failure. Please tried again.');
  };
  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter your email"
        label="Email"
        leftIcon={{type: 'material', name: 'email'}}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Input
        placeholder="Enter your password"
        label="Password"
        leftIcon={{type: 'material', name: 'lock'}}
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <Button title="sign in" style={styles.button} onPress={onPressLogin} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginTop: 100,
  },
  button: {
    width: 370,
    top: 70,
    bottom: 70,
  },
});

export default Login;

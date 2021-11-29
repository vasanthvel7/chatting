import * as React from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';

import firebase from 'firebase';
const Chat = () => {
  const val = useSelector(state => state.message);
  console.log(val);

  const dispatch = useDispatch();

  const [messages, setmessage] = React.useState([
    {
      _id: 1,
      text: 'Hello developer',
      createdAt: new Date(),
      user: {
        _id: 4,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
  ]);

  const user = {name: 'vasanth', _id: 2};

  React.useEffect(() => {
    let value = [];
    firebase
      .initializeApp({
        apiKey: 'AIzaSyB3ob2o2yfDFXShvGm9y_CUzR1Pvd5WX_A',
        authDomain: 'glocl-dfbc8.firebaseapp.com',
        databaseURL: 'https://glocl-dfbc8-default-rtdb.firebaseio.com',
        projectId: 'glocl-dfbc8',
        storageBucket: 'glocl-dfbc8.appspot.com',
        messagingSenderId:
          '1081089537459-ggt7084tutnk8bf2g1nl1ai9kcc3g0qi.apps.googleusercontent.com',
      })
      .auth()
      .onAuthStateChanged(onAuthStateChanged);
    firebase
      .database()
      .ref('message')
      .limitToLast(50)
      .on('child_added', snapshot => {
        value = parse(snapshot);
        setmessage(pre => GiftedChat.append(pre, value));
      });
  }, []);
  const onAuthStateChanged = async user => {
    if (!user) {
      try {
        await firebase.auth().signInAnonymously();
      } catch ({message}) {}
    }
  };
  const send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const {text, user} = messages[i];
      const sender = {
        _id: 1,
        text: 'Hello',
        createdAt: new Date(),
        user: {
          _id: 4,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      };
      const message = {
        text,
        user,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
      };
      append(message);
      setTimeout(() => append(sender), 1000);
    }
  };
  const parse = snapshot => {
    const {timestamp: numberStamp, text, user} = snapshot.val();
    const {key: _id} = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };

    return message;
  };
  const append = message => firebase.database().ref('message').push(message);

  return <GiftedChat messages={messages} user={user} onSend={send} />;
};
export default Chat;

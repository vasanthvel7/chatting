import firebase from 'firebase';
import firestore from 'firebase/firebase-firestore';
class Firebase {
  constructor() {
    this.init();
    this.observeAuth();
  }

  init = () =>
    firebase.initializeApp({
      apiKey: 'AIzaSyB3ob2o2yfDFXShvGm9y_CUzR1Pvd5WX_A',
      authDomain: 'glocl-dfbc8.firebaseapp.com',
      databaseURL: 'https://glocl-dfbc8-default-rtdb.firebaseio.com',
      projectId: 'glocl-dfbc8',
      storageBucket: 'glocl-dfbc8.appspot.com',
      messagingSenderId:
        '1081089537459-ggt7084tutnk8bf2g1nl1ai9kcc3g0qi.apps.googleusercontent.com',
    });

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = async user => {
    if (!user) {
      try {
        await firebase.auth().signInAnonymously();
      } catch ({message}) {}
    }
  };

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    return firebase.database().ref('message');
  }

  parse = snapshot => {
    const {timestamp: numberStamp, text, user} = snapshot.val();
    const {key: _id} = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    console.log(message);
    return message;
  };

  on = callback =>
    firebase
      .database()
      .ref('message')
      .limitToLast(50)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  // send  message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const {text, user} = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };

  append = message => firebase.database().ref('message').push(message);

  // close  connection to the Backend
  off() {
    firebase.database().ref('message').off();
  }
}

Firebase.shared = new Firebase();
export default Firebase;

import React from 'react';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PersistGate} from 'redux-persist/integration/react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
// import Chat from './Message/Chat';
import Homepage from './Message/Homepage';
// import User from './Message/User';
import AnimatedEmoji from './Message/TelegramChatUI';
import Animations from './Message/Animations';
const Stack = createStackNavigator();
const App = () => {
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  };
  const initialvalues = {
    message: [],
  };
  const rootReducer = (state = initialvalues, action) => {
    switch (action.type) {
      case 'Message':
        return {...state, message: action.message};
      default:
        return state;
    }
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  var store = createStore(persistedReducer);
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Homepage}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Chat" component={Animations} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import FloatingHearts from '../Message/Dummy';

const User = () => {
  var count = 0;

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={() => {
        count = count + 1;
      }}>
      <FloatingHearts count={count} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 750,
    width: 300,
    backgroundColor: 'red',
    paddingTop: 300,
  },
});

export default User;

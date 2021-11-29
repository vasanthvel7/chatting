import React, {useState, useEffect, useRef} from 'react';

import {
  View,
  Animated,
  StyleSheet,
  ViewPropTypes,
  Image,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

const Animations = () => {
  const [hearts, setHearts] = useState([]);
  const [emoji, setemoji] = useState([]);
  const [uid, setid] = useState([]);
  const value = new Animated.Value(250);
  const values = new Animated.Value(550);
  var height = 150;

  const started = e => {
    console.log(emoji.length);
  };
  const create = pic => {
    Animated.sequence([
      Animated.timing(value, {
        toValue: Math.random() * (190 - 2) + 2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.delay(1000),
      Animated.timing(value, {
        duration: 1000,
        useNativeDriver: true,
        toValue: -900,
      }),
    ]).start(started);

    setHearts([
      ...hearts,
      {
        id: getRandomId(20, 500),
        right: getRandomNumber(20, 150),
        pic: pic,
        value: value,
      },
    ]);
  };

  const getRandomNumber = (min, max) => Math.random() * (max - min) + min;
  const getRandomId = (min, max) => Math.random() * (max - min) + min + max;
  return (
    <View style={[styles.container]}>
      {hearts.map(({id, pic, right, value, values}) => {
        const heights = Math.ceil(height);
        console.log(heights);
        const negativeHeight = heights * 10;
        const shapeHeight = 90;
        const yAnimation = value.interpolate({
          inputRange: [0, negativeHeight],
          outputRange: [90, 0],
        });
        // const AnimationY = values.interpolate({
        //   inputRange: [-negativeHeight, 0],
        //   outputRange: [-70, 0],
        // });

        const opacityAnimation = yAnimation.interpolate({
          inputRange: [0, heights],
          outputRange: [1, 0],
        });
        const xAnimation = yAnimation.interpolate({
          inputRange: [0, heights / 2, heights],
          outputRange: [0, 25, -10],
        });
        const rotateAnimation = yAnimation.interpolate({
          inputRange: [
            0,
            heights / 10,
            heights / 7,
            heights / 4,
            heights / 3,
            heights / 2,
            heights,
          ],
          outputRange: [
            '0deg',
            '8deg',
            '16deg',
            '8deg',
            '0deg',
            '16deg',
            '0deg',
          ],
        });

        return (
          <Animated.View
            key={id}
            style={[
              styles.shapeWrapper,
              {
                transform: [
                  {translateY: value},
                  {translateX: xAnimation},
                  {rotate: rotateAnimation},
                ],
                opacity: opacityAnimation,
              },
            ]}>
            <Image
              source={{
                uri: pic,
              }}
              style={{height: 40, width: 40, right: right}}
            />
          </Animated.View>
        );
      })}
      <View
        style={{
          height: 85,
          width: 300,
          top: 730,
          left: 80,
          borderRadius: 10,
          bottom: 0,
          justifyContent: 'center',
          backgroundColor: 'whitesmoke',
        }}>
        <View
          style={{
            flexDirection: 'row',

            height: 60,
            left: 25,
          }}>
          <View>
            <TouchableWithoutFeedback
              onPress={() =>
                create(
                  'https://img.icons8.com/external-wanicon-flat-wanicon/50/000000/external-emoji-valentines-day-wanicon-flat-wanicon.png',
                )
              }>
              <Image
                source={{
                  uri: 'https://img.icons8.com/external-wanicon-flat-wanicon/50/000000/external-emoji-valentines-day-wanicon-flat-wanicon.png',
                }}
                style={{height: 50, width: 50}}
              />
            </TouchableWithoutFeedback>
          </View>

          <View style={{left: 20}}>
            <TouchableWithoutFeedback
              onPress={() =>
                create(
                  'https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-emoji-emoji-justicon-lineal-color-justicon-7.png',
                )
              }>
              <Image
                source={{
                  uri: 'https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-emoji-emoji-justicon-lineal-color-justicon-7.png',
                }}
                style={{height: 50, width: 50}}
              />
            </TouchableWithoutFeedback>
          </View>
          <View style={{left: 40}}>
            <TouchableWithoutFeedback
              onPress={() =>
                create(
                  'https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-emoji-emoji-justicon-lineal-color-justicon-12.png',
                )
              }>
              <Image
                source={{
                  uri: 'https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-emoji-emoji-justicon-lineal-color-justicon-12.png',
                }}
                style={{height: 50, width: 50}}
              />
            </TouchableWithoutFeedback>
          </View>
          <View style={{left: 60}}>
            <TouchableWithoutFeedback
              onPress={() =>
                create(
                  'https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-emoji-emoji-justicon-lineal-color-justicon-15.png',
                )
              }>
              <Image
                source={{
                  uri: 'https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-emoji-emoji-justicon-lineal-color-justicon-15.png',
                }}
                style={{height: 50, width: 50}}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    top: 10,
    left: 10,
    right: 10,
    bottom: 20,
    position: 'absolute',
  },
  shapeWrapper: {
    height: 100,
    width: 40,
    position: 'absolute',
    bottom: 200,
    right: 50,
    backgroundColor: 'transparent',
  },
});
export default Animations;

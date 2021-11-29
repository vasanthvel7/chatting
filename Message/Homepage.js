import React, {useRef, useState} from 'react';
import {View, Text, Image, RefreshControl} from 'react-native';
import {useWindowDimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {FlatList, Animated} from 'react-native';
import Chat from '../Message/Chats';
import {SafeAreaView, StyleSheet, SectionList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
const AnimatedFlalist = Animated.createAnimatedComponent(FlatList);
const Homepage = ({navigation}) => {
  const [currentdate, setCurrentDate] = useState([]);
  const [Index, setindex] = useState(1);
  const [scroll, setscroll] = useState(false);
  const messages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const layout = useWindowDimensions();
  const [DATA, setDATA] = useState([
    {
      title: '1 April, 2020',
      data: ['Hii', 'Hello'],
    },
    {title: '2 April, 2020', data: ['Hii', 'Hello']},
    {title: '3 April, 2020', data: ['Hii', 'Hello']},
    {title: '4 April, 2020', data: ['Hii', 'Hello']},
    {title: '5 April, 2020', data: ['Hii', 'Hello']},
    {title: '6 April, 2020', data: ['Hii', 'Hello']},
    {title: '7 April, 2020', data: ['Hii', 'Hello']},
    {title: '8 April, 2020', data: ['Hii', 'Hello']},
    {title: '9 April, 2020', data: ['Hii', 'Hello']},
    {title: '10 April, 2020', data: ['Hii', 'Hello', 'Hello']},
  ]);
  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Home'},
    {key: 'second', title: 'Chats'},
  ]);
  const updateStickyDate = ({viewableItems, changed}) => {
    if (viewableItems && viewableItems.length) {
      const lastItem = [...viewableItems].shift();
      setCurrentDate(viewableItems[0].section.title);
    }
  };
  const renderItem = ({item, separators}) => {
    return <Item title={item} />;
  };
  const renderHeaderItem = ({section: {title}}) => {
    return (
      <View>
        <View
          style={currentdate == title ? styles.stickyDat : styles.stickyDate}>
          <Text style={styles.stickyDateText}>{title}</Text>
        </View>
      </View>
    );
  };
  const FirstRoute = () => {
    return (
      <View
        style={{height: '100%', justifyContent: 'center', alignSelf: 'center'}}>
        <Text>Home</Text>
      </View>
    );
  };

  const headerHeight = 150;
  const ScrollY = useRef(new Animated.Value(0));
  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: ScrollY.current}}}],
    {useNativeDriver: true},
  );
  const ScrollYClamped = Animated.diffClamp(ScrollY.current, 0, headerHeight);
  const translateY = ScrollYClamped.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -90],
    extrapolate: 'clamp',
  });

  const SecondRoute = () => (
    <View style={{backgroundColor: 'lightblue', height: '100%'}}>
      <AnimatedFlalist
        data={messages}
        refreshControl={<RefreshControl />}
        onScroll={handleScroll}
        renderItem={item => {
          return (
            <TouchableOpacity
              style={{
                height: 100,
                width: 420,
                backgroundColor: 'rgb(167, 250, 250)',
                borderRadius: 20,
                marginVertical: 20,
                top: 10,
                bottom: 35,
              }}
              onPress={() => {
                navigation.navigate('Chat');
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{left: 50, top: 45}}>
                  {'React Native Developer - ' + item.item}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        onTabPress={({route, preventDefault}) => {
          preventDefault();
        }}
        style={{backgroundColor: 'gray'}}
        indicatorStyle={styles.indicator}
      />
    );
  };

  return (
    <View>
      <Animated.View
        style={[
          {
            height: 1100,
            position: 'absolute',
            right: 0,
            left: 0,
            top: 0,
          },
          {transform: [{translateY}]},
        ]}>
        <View
          style={[
            {
              height: '8%',
              width: '100%',
              backgroundColor: 'rgb(224, 193, 183)',
              borderRadius: 5,
            },
          ]}>
          <Text style={{left: 40, top: 25, fontSize: 20, fontWeight: 'bold'}}>
            Hello user!
          </Text>
        </View>

        <TabView
          style={{backgroundColor: 'pink'}}
          navigationState={{index, routes}}
          renderTabBar={renderTabBar}
          renderScene={renderScene}
          onIndexChange={setIndex}
        />
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {marginHorizontal: 1, backgroundColor: 'pink'},
  item: {
    backgroundColor: 'whitesmoke',
    padding: 20,
    fontSize: 10,
    left: 80,
    borderRadius: 20,
    marginVertical: 8,
    width: 230,
  },
  header: {fontSize: 24, backgroundColor: '#fff', alignSelf: 'center'},
  title: {fontSize: 24},
  stickyDate: {
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9c2ff',
    top: 20,
    opacity: 10,
    borderRadius: 10,
    marginBottom: 30,
  },
  stickyDat: {
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    top: 20,
    opacity: 10,
    borderRadius: 10,
    marginBottom: 30,
  },
  stickyDateText: {
    color: '#000',
    padding: 5,
  },
});
export default Homepage;

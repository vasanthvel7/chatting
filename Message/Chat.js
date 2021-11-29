import React, {useState, useContext, useEffect, useRef} from 'react';
import {FlatList, Animated, Image, RefreshControl} from 'react-native';
import {ActivityIndicator, View, StyleSheet, Text} from 'react-native';
import {SafeAreaView, SectionList} from 'react-native';

export default function Chat() {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [currentdate, setCurrentDate] = useState();
  const [date, setDate] = useState();
  const [user, setuser] = useState('2');
  const [position, setposition] = useState(0);
  const [opacity, setopacity] = useState(10);
  const [DATA, setDATA] = useState([
    {
      id: '1',
      title: '10 April, 2020',
      data: ['hii', 'hello'],
      image: 'https://placeimg.com/140/140/any',
    },
    {
      id: '2',
      title: '9 April, 2020',
      data: ['hii', 'hello'],
      image:
        'https://funkylife.in/wp-content/uploads/2021/06/whatsapp-dp-pic-24-scaled.jpg',
    },
    {
      id: '3',
      title: '8 April, 2020',
      data: ['hii', 'hello'],
      image:
        'https://i.pinimg.com/originals/8d/d6/33/8dd633dcc5c3d46c6f85ece1633e375b.jpg',
    },
    {
      id: '1',
      title: '7 April, 2020',
      data: ['hii', 'hello'],
      image: 'https://placeimg.com/140/140/any',
    },
    {
      id: '2',
      title: '6 April, 2020',
      data: ['hii', 'hello'],
      image:
        'https://funkylife.in/wp-content/uploads/2021/06/whatsapp-dp-pic-24-scaled.jpg',
    },
    {
      id: '6',
      title: '5 April, 2020',
      data: ['hii', 'hello'],
      image:
        'https://i.pinimg.com/originals/8d/d6/33/8dd633dcc5c3d46c6f85ece1633e375b.jpg',
    },
    {
      id: '2',
      title: '4 April, 2020',
      data: ['hii', 'hello'],
      image:
        'https://funkylife.in/wp-content/uploads/2021/06/whatsapp-dp-pic-24-scaled.jpg',
    },
    {
      id: '1',
      title: '3 April, 2020',
      data: ['hii', 'hello'],
      image: 'https://placeimg.com/140/140/any',
    },
    {
      id: '9',
      title: '2 April, 2020',
      data: ['hii', 'hello'],
      image:
        'https://i.pinimg.com/originals/8d/d6/33/8dd633dcc5c3d46c6f85ece1633e375b.jpg',
    },
    {
      id: '2',
      title: '1 April, 2020',
      data: ['hii', 'hello'],
      image:
        'https://funkylife.in/wp-content/uploads/2021/06/whatsapp-dp-pic-24-scaled.jpg',
    },
  ]);
  const handleScroll = event => {
    setopacity(10);
    setposition(event.nativeEvent.contentOffset.y);
  };
  const Item = ({title, id}) => {
    console.log(id);
    return (
      <View>
        <View style={user == id ? styles.item2 : styles.item1}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    );
  };
  const updateStickyDate = ({viewableItems, changed}) => {
    if (viewableItems && viewableItems.length) {
      setDate(viewableItems[12]?.section.title || null);

      setCurrentDate(viewableItems[0].section.title);
    }
  };
  const renderItem = ({item, separators}) => {
    console.log(item);
    return <Item title={item} id={item.id} />;
  };

  return (
    <View style={{height: 850, backgroundColor: 'pink'}}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => {
          return index + item + '';
        }}
        renderItem={renderItem}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: animatedValue}}}],
          {useNativeDriver: false},
        )}
        onScrollBeginDrag={handleScroll}
        onScrollEndDrag={() => {
          if (position >= 35) {
            setTimeout(() => {
              if (position >= 35) {
                setopacity(0);
              }
            }, 1000);
          } else {
            setopacity(10);
          }
        }}
        stickySectionHeadersEnabled={true}
        renderSectionHeader={(item, index) => {
          return (
            <View style={{marginVertical: 20}}>
              <Animated.View
                style={[
                  {
                    top: 40,
                    left: 30,
                  },
                ]}>
                <Animated.Image
                  source={{uri: item.section.image}}
                  style={[
                    user == item.section.id
                      ? {
                          height: 40,
                          width: 40,
                          borderRadius: 30,
                          position: 'absolute',
                          right: 35,
                        }
                      : {
                          height: 40,
                          width: 40,
                          borderRadius: 30,
                          position: 'absolute',
                        },
                  ]}
                />
              </Animated.View>
            </View>
          );
        }}
        onViewableItemsChanged={updateStickyDate}
      />

      <View
        style={{
          height: 70,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red',
        }}>
        <View style={[styles.fixed]}>
          <View
            style={{
              height: 30,
              width: 370,
              borderRadius: 30,
              backgroundColor: 'white',
            }}></View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {marginHorizontal: 1, backgroundColor: 'pink'},
  item1: {
    backgroundColor: 'whitesmoke',
    padding: 20,
    top: 10,
    fontSize: 10,
    left: 80,
    borderRadius: 20,
    marginVertical: 8,
    width: 230,
  },
  item2: {
    backgroundColor: 'aqua',
    padding: 20,
    top: 10,
    fontSize: 10,
    left: 130,
    right: 20,
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
    top: 10,
    opacity: 10,
    borderRadius: 10,
    marginBottom: 30,
  },
  stickyDateText: {
    color: '#000',
    padding: 5,
  },
  fixed: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 0,
    bottom: 0,
  },
});

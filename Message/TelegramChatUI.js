import React, {useState, useContext, useEffect, useRef} from 'react';
import {
  FlatList,
  Animated,
  Image,
  RefreshControl,
  VirtualizedList,
} from 'react-native';
import {ActivityIndicator, View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function TelegramChatUI() {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [currentdate, setCurrentDate] = useState();
  const [date, setDate] = useState();
  const [user, setuser] = useState('2');

  const [dates, setDates] = useState([
    '1 April, 2020',
    '4 April, 2020',
    '6 April, 2020',
    '9 April, 2020',
  ]);
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
  const updateStickyDate = ({viewableItems, changed}) => {
    console.log(viewableItems[0].item.data);
    if (viewableItems && viewableItems.length) {
      setCurrentDate(viewableItems[0].item.title);
    }
  };
  const Item = title => {
    console.log(title);
    return (
      <View>
        <View style={styles.stickyDate}>
          <Text style={styles.stickyDateText}>{title.item.title}</Text>
        </View>
        <FlatList
          data={title.item.data}
          ListHeaderComponent={item => {
            return (
              <View style={{marginVertical: 20}}>
                <View
                  style={[
                    {
                      top: 40,
                      left: 30,
                    },
                  ]}>
                  <Image
                    source={{uri: title.item.image}}
                    style={[
                      user == title.item.id
                        ? {
                            height: 40,
                            width: 40,
                            borderRadius: 30,
                            position: 'absolute',
                            top: 100,
                            right: 35,
                          }
                        : {
                            height: 40,
                            width: 40,
                            top: 100,
                            borderRadius: 30,
                            position: 'absolute',
                          },
                    ]}
                  />
                </View>
              </View>
            );
          }}
          stickyHeaderIndices={[1]}
          StickyHeaderComponentEnabled={true}
          renderItem={item => {
            return (
              <View>
                <View
                  style={user == title.item.id ? styles.item2 : styles.item1}>
                  <Text style={styles.title}>{item.item}</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  };

  const getItem = (data, index) => data[index];

  const getItemCount = () => 10;

  return (
    <View style={{backgroundColor: 'pink'}}>
      <VirtualizedList
        data={DATA}
        ListHeaderComponent={item => {
          console.log(item);
          return (
            <View
              style={{
                alignSelf: 'center',
                textAlign: 'center',
                justifyContent: 'center',
                backgroundColor: '#f9c2ff',
                top: 10,
                opacity: 10,
                borderRadius: 10,
                marginBottom: 30,
              }}>
              <Text style={styles.stickyDateText}>{currentdate}</Text>
            </View>
          );
        }}
        stickyHeaderIndices={[0]}
        StickyHeaderComponentEnabled={true}
        keyExtractor={(item, index) => index}
        getItem={getItem}
        onViewableItemsChanged={updateStickyDate}
        getItemCount={getItemCount}
        renderItem={Item}
      />

      <View
        style={{
          height: 70,
          top: -70,
          justifyContent: 'center',
          backgroundColor: 'red',
        }}>
        <View
          style={{
            flexDirection: 'row',

            height: 60,
            left: 25,
          }}>
          <View>
            <TouchableOpacity>
              <Image
                source={{
                  uri: 'https://img.icons8.com/external-wanicon-flat-wanicon/50/000000/external-emoji-valentines-day-wanicon-flat-wanicon.png',
                }}
                style={{height: 50, width: 50}}
              />
            </TouchableOpacity>
          </View>

          <View style={{left: 50}}>
            <TouchableOpacity>
              <Image
                source={{
                  uri: 'https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-emoji-emoji-justicon-lineal-color-justicon-7.png',
                }}
                style={{height: 50, width: 50}}
              />
            </TouchableOpacity>
          </View>
          <View style={{left: 100}}>
            <TouchableOpacity>
              <Image
                source={{
                  uri: 'https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-emoji-emoji-justicon-lineal-color-justicon-12.png',
                }}
                style={{height: 50, width: 50}}
              />
            </TouchableOpacity>
          </View>
          <View style={{left: 160}}>
            <TouchableOpacity>
              <Image
                source={{
                  uri: 'https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-emoji-emoji-justicon-lineal-color-justicon-15.png',
                }}
                style={{height: 50, width: 50}}
              />
            </TouchableOpacity>
          </View>
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
    top: 30,
    opacity: 10,
    borderRadius: 10,
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

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  List,
  Searchbar,
  IconButton,
  Paragraph,
  ActivityIndicator,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import axios from 'axios';
import Hearting from '../../components/Hearting';

const {width, height} = Dimensions.get('window');
const itemWidth = width / 2.5;
const itemHeight = height / 2.5;
export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query) => setSearchQuery(query);
  const navigation = useNavigation();
  useEffect(() => {
    axios
      .get(
        'https://raw.githubusercontent.com/DevTides/DogsApi/master/dogs.json',
      )
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const searchItem = data.filter((x) =>
        x.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setData(searchItem);
    } else {
      axios
        .get(
          'https://raw.githubusercontent.com/DevTides/DogsApi/master/dogs.json',
        )
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
        });
    }
  }, [searchQuery]);

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          margin: 10,
          backgroundColor: 'white',
          width: itemWidth,
          height: itemHeight,
          borderWidth: 4,
          borderColor: '#9e9e9e',
          borderRadius: 10,
        }}>
        <Swiper showsPagination={false}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Detail', {item: item});
              }}>
              <Image
                style={{
                  width: itemWidth,
                  height: 160,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
                source={{uri: item.url}}
              />
              <List.Item
                style={{margin: 10}}
                title={item.name}
                description={item.bred_for}
                right={() => <Hearting icon="heart" size={20} />}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, justifyContent: 'center', padding: 10}}>
            <Paragraph>
              Breed for:{' '}
              <Text style={{fontWeight: 'bold'}}>{item.bred_for}</Text>{' '}
            </Paragraph>
            <Paragraph>
              Breed group:{' '}
              <Text style={{fontWeight: 'bold'}}>{item.breed_group}</Text>
            </Paragraph>
            <Paragraph>
              Life span:{' '}
              <Text style={{fontWeight: 'bold'}}>{item.life_span}</Text>
            </Paragraph>
          </View>
        </Swiper>
      </View>
    );
  };
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Searchbar
        style={{marginHorizontal: 30, marginTop: 20}}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}>
        {!isLoading ? (
          <FlatList
            data={data}
            renderItem={renderItem}
            numColumns={2}
            keyExtractor={(item, index) => `${index}`}
          />
        ) : (
          <View>
            <ActivityIndicator />
            <Text>Loading...</Text>
          </View>
        )}
      </View>
    </View>
  );
}

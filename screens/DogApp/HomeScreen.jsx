import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  IconButton,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import axios from 'axios';
export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [like, setLike] = useState(false);
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

  const renderItem = ({item}) => {
    return (
      <View style={{margin: 10, width: '45%'}}>
        <Card
          onPress={() => {
            navigation.navigate('Detail', {item: item});
          }}>
          <Card.Cover source={{uri: `${item.url}`}} />
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-between',
              }}>
              <Title style={{flex: 6}} style={{fontSize: 16}}>
                {item.name}
              </Title>
              <IconButton
                style={{flex: 1}}
                icon="heart"
                color={like ? 'red' : 'black'}
                size={20}
                onPress={() => setLike(!like)}
              />
            </View>
            <Paragraph>{item.bred_for}</Paragraph>
          </Card.Content>
        </Card>
      </View>
    );
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {!isLoading ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={(item, index) => `${index}`}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {Searchbar, Avatar, FAB, Card} from 'react-native-paper';
import data from './data';

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
export default function HomeScreen() {
  const [listData, setListData] = useState(data);
  const [searchQuery, setSearchQuery] = useState('');

  const LeftContent = () => <Avatar.Icon size={46} icon="account" />;

  const onChangeSearch = (query) => setSearchQuery(query);

  useEffect(() => {
    if (searchQuery) {
      const newData = listData.filter((x) =>
        x.name
          .toLowerCase()
          .includes(
            searchQuery.toLowerCase() || x.phoneNumber.includes(searchQuery),
          ),
      );
      setListData(newData);
    } else setListData(data);
  }, [searchQuery]);

  const renderItem = ({item}) => {
    return (
      <View style={{marginHorizontal: 10, marginVertical: 5}}>
        <TouchableOpacity>
          <Card>
            <Card.Title
              title={item.name}
              subtitle={item.phoneNumber}
              subtitleStyle={{fontSize: 14}}
              left={LeftContent}
            />
          </Card>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <View>
        <Searchbar
          style={{margin: 10}}
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
      <View>
        <FlatList
          data={listData}
          renderItem={renderItem}
          keyExtractor={(item, index) => `item ${index}`}
        />
      </View>
      <FAB
        style={styles.fab}
        large
        icon="plus"
        color="white"
        onPress={() => console.log('Pressed')}
      />
    </View>
  );
}

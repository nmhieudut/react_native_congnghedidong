import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Searchbar, Avatar, FAB, Card, List} from 'react-native-paper';
import {Linking} from 'react-native';
import firebase from './firebase';
import Icon from 'react-native-vector-icons/Feather';

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: 'blue',
  },
});
export default function HomeScreen({route, navigation}) {
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query) => setSearchQuery(query);
  useEffect(() => {
    firebase
      .fetchData()
      .then((res) => {
        setListData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [listData]);

  useEffect(() => {
    if (searchQuery) {
      const newData = listData.filter((x) =>
        x.user.name
          .trim()
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase()),
      );
      setListData(newData);
    } else {
      firebase.fetchData().then((res) => {
        setListData(res);
      });
    }
  }, [searchQuery]);

  const handleRefresh = () => {
    setFetching(true);
    firebase
      .fetchData()
      .then((res) => {
        setListData(res);
        setFetching(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 5,
        }}>
        <TouchableOpacity>
          <Card>
            <List.Accordion
              title={item.user.name}
              description={item.user.phoneNumber}
              left={() => (
                <Avatar.Text
                  size={48}
                  style={{backgroundColor: 'blue'}}
                  label={item.user.name.charAt(0).toUpperCase()}
                />
              )}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                  backgroundColor: '#f5f5f5',
                  paddingLeft: 0,
                }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    Linking.openURL(`tel:${item.user.phoneNumber}`);
                  }}>
                  <View>
                    <Icon name="phone-call" size={20} color="green" />
                    <Text>Call</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                  onPress={() => {}}>
                  <View>
                    <Icon name="mail" size={20} color="red" />
                    <Text>Mail</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                  onPress={() => navigation.navigate('Detail', {item: item})}>
                  <View>
                    <Icon name="info" size={20} color="#bdbdbd" />
                    <Text>Info</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </List.Accordion>
          </Card>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <View style={{backgroundColor: 'blue'}}>
        <Searchbar
          style={{marginHorizontal: 10, marginVertical: 20}}
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#2d3436" />
          <Text>Loading...</Text>
        </View>
      ) : (
        <View>
          <FlatList
            data={listData}
            renderItem={renderItem}
            refreshing={fetching}
            onRefresh={handleRefresh}
            keyExtractor={(item, index) => `item ${index}`}
          />
        </View>
      )}
      <FAB
        style={styles.fab}
        large
        icon="plus"
        color="white"
        onPress={() => navigation.navigate('New')}
      />
    </View>
  );
}

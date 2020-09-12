import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {TextInput, Button, Menu, Divider, Provider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/Entypo';
import firestore from '@react-native-firebase/firestore';

export default function DetailScreen({route, navigation}) {
  const [name, setName] = React.useState();
  const [email, setEmail] = React.useState();
  const [phone, setPhone] = React.useState();

  const addUser = () => {
    firestore()
      .collection('Contacts')
      .add({
        email: email,
        name: name,
        phoneNumber: phone,
      })
      .then((res) => {
        navigation.navigate('Home');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Provider>
      <View>
        <View
          style={{
            height: 60,
            flexDirection: 'row',
            borderBottomWidth: 0.5,
          }}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Icon name="left" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 7,
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16}}>New Contact</Text>
          </View>
          <View
            style={{
              flex: 3,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity onPress={addUser}>
              <Icon name="check" size={24} color="green" />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TextInput
            style={{margin: 10}}
            mode="flat"
            label="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={{margin: 10}}
            mode="flat"
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={{margin: 10}}
            mode="flat"
            label="Phone number"
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />
        </View>
      </View>
    </Provider>
  );
}

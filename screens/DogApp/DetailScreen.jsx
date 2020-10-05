import React from 'react';
import {View, Text, Image} from 'react-native';
import {Paragraph, Title} from 'react-native-paper';
export default function DetailScreen({route}) {
  const item = route.params.item;
  return (
    <View style={{flex: 1}}>
      <View style={{margin: 10}}>
        <Image
          style={{width: '100%', height: 200}}
          source={{uri: `${item.url}`}}
        />
        <View
          style={{padding: 10, justifyContent: 'center', alignItems: 'center'}}>
          <Title>{item.name}</Title>
        </View>
        <View style={{padding: 20}}>
          <Paragraph>
            Breed for: <Text style={{fontWeight: 'bold'}}>{item.bred_for}</Text>{' '}
          </Paragraph>
          <Paragraph>
            Breed group:{' '}
            <Text style={{fontWeight: 'bold'}}>{item.breed_group}</Text>
          </Paragraph>
          <Paragraph>
            Life span:{' '}
            <Text style={{fontWeight: 'bold'}}>{item.life_span}</Text>
          </Paragraph>
          <Paragraph>
            Origin: <Text style={{fontWeight: 'bold'}}>{item.origin}</Text>
          </Paragraph>
          <Paragraph>
            Temperature:{' '}
            <Text style={{fontWeight: 'bold'}}>{item.temperament}</Text>
          </Paragraph>
          <Paragraph>
            Height:{' '}
            <Text style={{fontWeight: 'bold'}}>{item.height.metric} cm </Text>
          </Paragraph>
          <Paragraph>
            Weight:{' '}
            <Text style={{fontWeight: 'bold'}}>{item.weight.metric} kg</Text>
          </Paragraph>
        </View>
      </View>
    </View>
  );
}

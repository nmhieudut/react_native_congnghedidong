import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './DogApp/HomeScreen';
import DetailScreen from './DogApp/DetailScreen';
// import NewScreen from './ContactApp/NewScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            title: 'Dogs',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
          }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{title: 'Detail'}}
          name="Detail"
          component={DetailScreen}
        />
        {/* <Stack.Screen
          options={{headerShown: false}}
          name="New"
          component={NewScreen}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './ContactApp/HomeScreen';
import DetailScreen from './ContactApp/DetailScreen';
import NewScreen from './ContactApp/NewScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Detail"
          component={DetailScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="New"
          component={NewScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

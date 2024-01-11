import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateBook from './createBook';
import CameraScreen from './camera';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CreateBook">
        <Stack.Screen name="CreateBook" component={CreateBook} />
        <Stack.Screen name="CameraScrean" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

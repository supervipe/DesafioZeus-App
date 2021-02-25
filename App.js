import React,{ useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import Cadastro from './screens/Cadastro';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
    </Stack.Navigator>
  );
}

export default function App() {

  return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
  );
}


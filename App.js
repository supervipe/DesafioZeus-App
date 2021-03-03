import React,{ useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import Cadastro from './screens/Cadastro';
import MudarSenha from './screens/MudarSenha';
import Sobre from './screens/Home';

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
      <Stack.Screen name="MudarSenha" component={MudarSenha} />
      <Stack.Screen name="Sobre" component={Sobre} />
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


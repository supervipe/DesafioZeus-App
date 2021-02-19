import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image,SafeAreaView, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <SafeAreaView style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>{"\n"}Hello World!</Text>
          <Button
            color="red"
            title="Entrar" 
          />
          <StatusBar style="auto" />
        </SafeAreaView>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#686868',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

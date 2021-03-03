import React,{ useState} from 'react';
import { StyleSheet, View, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Text,Input, Button, Icon} from 'react-native-elements';
import axios from 'axios';

export default function MudarSenha({navigation}) {

  const [senhaAntiga, setSenhaAntiga] = useState(null)
  const [senha, setSenha] = useState(null)
  const [senhaC, setSenhaC] = useState(null)
  const api = axios.create({
    baseURL: "http://192.168.1.10:8000",
  });
  const voltar = () => {
    navigation.reset({
      index: 0,
      routes: [{name: "Sobre"}]
  })
  }

  const alterar = async () =>{
    const id = await AsyncStorage.getItem('id');
    if(senha == senhaC){
        await api.put(`/usuario/${id}`, { 
            senha: senha })
        .then(res => {
            console.log(res.data[0]);
            Alert.alert("Senha mudada com sucesso!");
            navigation.reset({
                index: 0,
                routes: [{name: "Sobre"}]
            })
        })
        .catch(err => console.log('Erro:', err));
    } else{
        Alert.alert("Senhas diferentes inseridas!");
    }
  }

  return (
        <View style={styles.container}>
          <View style={{position:'absolute',left:10,top:22}}>
            <Button
              icon={
                <Icon
                  name="arrow-left"
                  size={25}
                  color="white"
                />
              }
              onPress={()=> voltar()}
            />
          </View>
          
          <Text style={styles.innertext} h2>Troca de Senha</Text>
          <Input
            placeholder="Senha Atual"
            placeholderTextColor="#354355"
            leftIcon={{type: 'font-awesome', name: 'lock'}}
            onChangeText={value => setSenhaAntiga(value)}
            secureTextEntry={true}
          />
          <Input
            placeholder="Nova Senha"
            placeholderTextColor="#354355"
            leftIcon={{type: 'font-awesome', name: 'lock'}}
            onChangeText={value => setSenha(value)}
            secureTextEntry={true}
          />
          <Input
            placeholder="Confirmação da Nova Senha"
            placeholderTextColor="#354355"
            leftIcon={{type: 'font-awesome', name: 'lock'}}
            onChangeText={value => setSenhaC(value)}
            secureTextEntry={true}
          />
          <Button
            title="Alterar"
            onPress={()=> alterar()}
          />
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff5678',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  innertext: {
    color: "black"
  },
  inputText: {
    color: "#354355"
  },
  imageSize: {
    width: 100,
    height: 100
    }
});

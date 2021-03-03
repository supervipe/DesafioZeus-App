import React,{ useState} from 'react';
import { StyleSheet, View, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Text,Input, Button, Icon} from 'react-native-elements';
import icon from '../assets/icon.png'
import { LoginFunc } from '../services/usuarioService'
import axios from 'axios';

export default function Login({navigation}) {

  const [email, setEmail] = useState(null)
  const [senha, setSenha] = useState(null)
  const api = axios.create({
    baseURL: "http://192.168.1.10:8000",
  });

  const cadastrar = () =>{
    navigation.reset({
      index: 0,
      routes: [{name: "Cadastro"}]
    })
  }
  const entrar = async () =>{
    //const cont = await LoginFunc(email,senha);
    const cont = await api.post("/usuario/login/", { 
        email: email,
        senha: senha })
    .then(async res => {
        if(res.data[0] != null) {
            await AsyncStorage.setItem('id', res.data[0].id.toString());
            await AsyncStorage.setItem('nome', res.data[0].nome.toString());
            await AsyncStorage.setItem('email', res.data[0].email.toString());
            await AsyncStorage.setItem('cachorro', res.data[0].cachorro.toString());
            console.log(await AsyncStorage.getItem('id'))
            return true;
        } else {
            Alert.alert("Usuário não encontrado! Por favor checar email ou senha.");
        }
    })
    .catch(err => console.warn('Erro:', err));
    if(cont) {
      navigation.reset({
        index: 0,
        routes: [{name: "Home"}]
      })
    }
  }

  return (
        <View style={styles.container}>
          <Image source={icon}></Image>
          <Text style={styles.innertext} h2>Controle Pet</Text>
          <Input 
            placeholder="E-mail"
            placeholderTextColor="#354355"
            leftIcon={{type: 'font-awesome', name: 'envelope'}}
            onChangeText={value => setEmail(value)}
            keyboardType="email-address"
          />
          <Input
            placeholder="Senha"
            placeholderTextColor="#354355"
            leftIcon={{type: 'font-awesome', name: 'lock'}}
            onChangeText={value => setSenha(value)}
            secureTextEntry={true}
          />
          <Button
             color="#354355"
            icon={
              <Icon
                name="arrow-right"
                size={20}
                color="white"
              />
            }
            title="Entrar"
            onPress={()=> entrar()}
          />
          <Text onPress={()=> cadastrar()} style = {{ color: '#fff', fontSize:17 }}>
            {"\n"}
            Clique aqui para se cadastrar!
          </Text>
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
  }
});

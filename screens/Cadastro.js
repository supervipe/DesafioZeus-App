import React,{ useState} from 'react';
import { StyleSheet, View, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Text,Input, Button, Icon} from 'react-native-elements';
import icon from '../assets/icon.png'
import axios from 'axios';

export default function Cadastro({navigation}) {

  const [nome, setNome] = useState(null)
  const [email, setEmail] = useState(null)
  const [senha, setSenha] = useState(null)
  const [senhaC, setSenhaC] = useState(null)
  const [nascimento, setNascimento] = useState(null)
  const [genero, setGenero] = useState(null)
  const [cachorro, setCachorro] = useState(null)

  const api = axios.create({
    baseURL: "http://172.18.9.216:8000",
  });

  const cadastrar = async () =>{
    //const cont = await LoginFunc(email,senha);
    if(senha == senhaC){
        axios.post("/usuario", { 
            nome: nome,
            email: email,
            senha: senha,
            nascimento: nascimento,
            genero: genero,
            cachorro: cachorro })
        .then(res => {
            console.log(res.data[0]);
        })
        const cont = await api.post("/usuario/login/", { 
            email: email,
            senha: senha })
        .then(async res => {
            console.log(res.data[0]);
            if(res.data[0] != null) {
                await AsyncStorage.setItem('id', res.data[0].id.toString());
                console.log(await AsyncStorage.getItem('id'))
                return true;
            }
        })
        .catch(err => console.log('Erro:', err));
        if(cont) {
            navigation.reset({
                index: 0,
                routes: [{name: "Home"}]
            })
        }
    } else{
        Alert.alert("Senhas diferentes inseridas!")
    }
  }

  return (
        <View style={styles.container}>
          <Image source={icon} style={styles.imageSize}></Image>
          <Text style={styles.innertext} h2>Cadastro</Text>
          <Input 
            placeholder="Nome"
            placeholderTextColor="#354355"
            leftIcon={{type: 'font-awesome', name: 'angle-right'}}
            onChangeText={value => setNome(value)}
            keyboardType="email-address"
          />
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
          <Input
            placeholder="Confirmação da Senha"
            placeholderTextColor="#354355"
            leftIcon={{type: 'font-awesome', name: 'lock'}}
            onChangeText={value => setSenhaC(value)}
            secureTextEntry={true}
          />
          <Input
            placeholder="Data de nascimento"
            placeholderTextColor="#354355"
            leftIcon={{type: 'font-awesome', name: 'calendar'}}
            onChangeText={value => setNascimento(value)}
            keyboardType="number-pad"
          />
          <Input
            placeholder="Genêro"
            placeholderTextColor="#354355"
            leftIcon={{type: 'font-awesome', name: 'angle-right'}}
            onChangeText={value => setGenero(value)}
          />
          <Input
            placeholder="Nome do Cachorro"
            placeholderTextColor="#354355"
            leftIcon={{type: 'font-awesome', name: 'angle-right'}}
            onChangeText={value => setCachorro(value)}
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
            title="Cadastrar-se"
            onPress={()=> cadastrar()}
          />
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e47087',
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

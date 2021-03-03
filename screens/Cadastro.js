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
    baseURL: "http://192.168.1.10:8000",
  });

  const voltar = () => {
    navigation.reset({
      index: 0,
      routes: [{name: "Login"}]
  })
  }

  const cadastrar = async () =>{
    //const cont = await LoginFunc(email,senha);
    if(senha == senhaC){
        await api.post("/usuario", { 
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
                await AsyncStorage.setItem('nome', res.data[0].nome.toString());
                await AsyncStorage.setItem('email', res.data[0].email.toString());
                await AsyncStorage.setItem('cachorro', res.data[0].cachorro.toString());
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
            title="Cadastrar"
            onPress={()=> cadastrar()}
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

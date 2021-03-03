import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Input, Button, Icon } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import icon from '../assets/icon.png'
import UserImage from '../assets/UserImage.png'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';


function Home() {

  const [mes, setMes] = useState(null)
  const [ano, setAno] = useState(null)
  const [preco, setPreco] = useState(null)
  const [nome, setNome] = useState(null)
  const [dog, setDog] = useState(null)
  const api = axios.create({
    baseURL: "http://192.168.1.10:8000",
  });


  useEffect(() => {
    const getNome = async () => {
      const n = await AsyncStorage.getItem('nome');
      const c = await AsyncStorage.getItem('cachorro');
      setNome(n);
      setDog(c);
    }
    getNome();
  }, [preco])

  const pesquisar = async () => {
    const id = await AsyncStorage.getItem('id');
    await api.post(`/racao/${id}`, {
      data: ano + mes
    })
      .then(res => {
        console.log(res.data[0]);
        setPreco(res.data[0].somaPQ);
        if (res.data[0].somaPQ == null) {
          Alert.alert("Nenhum gasto foi feito nessa data!")
        }
      }).catch(err => console.log('Erro:', err));

  }

  return (
    <View style={styles.container} >
      <Text h3>Olá {nome}, aqui você poderá fazer o controle das compras para {dog}! {"\n"}</Text>

      <Text h4>Abaixo você pode procurar saber o gasto mensal das compras na data que inserir:{"\n"}</Text>
      <Input
        placeholder="Mês"
        placeholderTextColor="#354355"
        leftIcon={{ type: 'font-awesome', name: 'calendar' }}
        onChangeText={value => setMes(value)}
        keyboardType="number-pad"
      />
      <Input
        placeholder="Ano"
        placeholderTextColor="#354355"
        leftIcon={{ type: 'font-awesome', name: 'calendar' }}
        onChangeText={value => setAno(value)}
        keyboardType="number-pad"
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
        title="Pesquisar"
        onPress={() => pesquisar()}
      />
      <Text style={{ fontSize: 20, opacity: (preco !== null) ? 1 : 0 }}>
        {"\n"}
              Gasto Mensal do mês {mes} do ano {ano} foi de R$ {preco}
      </Text>
    </View>
  );
}
function Compras({ navigation }) {
  const [nome, setNome] = useState(null)
  const [quantidade, setQuant] = useState(null)
  const [preco, setPreco] = useState(null)
  const [data, setData] = useState(null)
  const [uniquevalue, setU] = useState(null)
  const api = axios.create({
    baseURL: "http://192.168.1.10:8000",
  });

  const cadastrar = async () => {
    const id = await AsyncStorage.getItem('id');
    await api.post("/racao", {
      nome: nome,
      quantidade: quantidade,
      preco: preco,
      data: data,
      usuario_fk: id
    })
      .then(res => {
        console.log(res.data[0]);
        setU("0")
        Alert.alert("Produto cadastrado com sucesso!")
      }).catch(function (error) {
        console.warn(error);
        Alert.alert("Erro ao cadastrar!", "Ocorreu um erro no cadastro da compra! Por favor conferir as informações novamente.")
      })
  }

  return (
    <View style={styles.container}>
      <Text h3>Cadastre a nova compra abaixo: {"\n"}</Text>
      <Input
        placeholder="Nome do Produto"
        placeholderTextColor="#354355"
        leftIcon={{ type: 'font-awesome', name: 'angle-right' }}
        onChangeText={value => setNome(value)}
        keyboardType="default"
      />
      <Input
        placeholder="Quantidade"
        placeholderTextColor="#354355"
        leftIcon={{ type: 'font-awesome', name: 'angle-right' }}
        onChangeText={value => setQuant(value)}
        keyboardType="number-pad"
      />
      <Input
        placeholder="Preço"
        placeholderTextColor="#354355"
        leftIcon={{ type: 'font-awesome', name: 'money' }}
        onChangeText={value => setPreco(value)}
        keyboardType="decimal-pad"
      />
      <Input
        placeholder="Data da compra"
        placeholderTextColor="#354355"
        leftIcon={{ type: 'font-awesome', name: 'calendar' }}
        onChangeText={value => setData(value)}
        keyboardType="number-pad"
      />
      <Button
        title="Cadastrar"
        onPress={() => cadastrar()}
      />
    </View>
  );
}
function Sobre() {

  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.imageSize}></Image>
      <Text h2>Controle Pet</Text>
      <Text h4>Esse sistema foi desenvolvido para que o usuário pudesse ter
      melhor controle das compras feitas para o seu cachorro. Contém funcionalidades de
      adicionar suas compras, verificar o histórico de compras e checar o gasto mensal das compras
      conforme data solicitada, também a visualização da suas informações e atualização da senha!
                {"\n"}
      </Text>
      <Text h4>
        Para relato de problemas ou mais informações contactar:
                {"\n"}
                Telefone: (XX) XXXXX-XXXX
                {"\n"}
                Email: XXXXX@gmail.com
                {"\n"}
      </Text>
    </View>
  );
}
function Usuario({ navigation }) {

  const [nome, setNome] = useState(null)
  const [email, setEmail] = useState(null)
  const [racoes, setRacoes] = useState([])
  const api = axios.create({
    baseURL: "http://192.168.1.10:8000",
  });

  const senha = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "MudarSenha" }]
    })
  }
  const logout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }]
    })
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getInfo();
    });
    return unsubscribe;
  }, [navigation]);

  const getNome = async () => {
    const n = await AsyncStorage.getItem('nome');
    const c = await AsyncStorage.getItem('email');
    setNome(n);
    setEmail(c);
  }

  const setNewData = async () => {
    const id = await AsyncStorage.getItem('id');

    await api.get(`/racao/historico/${id}`)
      .then(res => {
        setRacoes(res.data);
      })
  }

  async function getInfo() {
    await getNome();
    await setNewData();
  }


  const mapReturn = (lista) => {
    return lista.map(value => {
      return (
        <View key={value.id}>
          <Text style={styles.borda}>
            Nome do Produto: {value.nome} | Quantidade: {value.quantidade} | Preço: R${value.preco} |{"\n"} Data: {moment(value.data).format("DD/MM/YYYY")}
          </Text>
        </View>

      );
    })
  }
  return (
    <View style={styles.container}>
      <ScrollView>
      <Image source={UserImage} style={styles.imageSize}></Image>
      <Text h4>
        Nome: {nome} {"\n"}
        Email: {email} {"\n"}
      </Text>
      <Text h3>
        Histórico de compras
      </Text>
      {mapReturn(racoes)}
      <View style={styles.horizontal}>
        <View style={styles.buttonColor}>
          <Button
            title="Mudar Senha"
            onPress={() => senha()}
          />
        </View>
        <View style={styles.buttonColor}>
          <Button
            title="LogOut"
            onPress={() => logout()}
          />
        </View>
      </View>
      </ScrollView>
    </View>
  );
}
const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Compras"
        component={Compras}
        options={{
          tabBarLabel: 'Compras',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bone" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Usuario"
        component={Usuario}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Sobre"
        component={Sobre}
        options={{
          tabBarLabel: 'Sobre',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff5678',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingTop: 50
  },
  imageSize: {
    width: 100,
    height: 100
  },
  horizontal: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 15
  },
  buttonColor: {
    flex: 1,
    paddingLeft: 10,
  },
  borda: {
    borderWidth: 6,
    borderColor: '#354355',
    paddingHorizontal: 15,
    paddingTop: 5,
    fontSize: 18,
    marginTop: 5
  }
});
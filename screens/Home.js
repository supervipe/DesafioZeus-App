import React,{ useState, useEffect} from 'react';
import { StyleSheet,View,Image } from 'react-native';
import { Text,Input,Button,Icon } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import icon from '../assets/icon.png'
import { color } from 'react-native-reanimated';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';

function Home(){
    
    const [mes, setMes] = useState(null)
    const [ano, setAno] = useState(null) 
    const [preco, setPreco] = useState(null)
    const api = axios.create({
      baseURL: "http://172.18.9.216:8000",
    });

    useEffect(() => {
      
    },[preco])

    const pesquisar = async () => {
      const id = await AsyncStorage.getItem('id')
      await api.post(`/racao/${id}`, { 
          data: ano + mes })
      .then(res => {
          console.log(res.data[0]);
          setPreco(res.data[0].somaPQ);
          if(res.data[0].somaPQ == null){
            Alert.alert("Nenhum gasto foi feito nessa data!")
          }
      }).catch(err => console.log('Erro:', err));
        
    }

    return(
        <View style={styles.container}>
            <Text h3>Olá Felipe, aqui você poderá fazer o controle da ração do Zeus! {"\n"}</Text>
            
            <Text h4>Abaixo você pode procurar saber o gasto mensal de ração na data que inserir:{"\n"}</Text>
            <Input 
                placeholder="Mês"
                placeholderTextColor="#354355"
                leftIcon={{type: 'font-awesome', name: 'calendar'}}
                onChangeText={value => setMes(value)}
                keyboardType="number-pad"
            />
            <Input 
                placeholder="Ano"
                placeholderTextColor="#354355"
                leftIcon={{type: 'font-awesome', name: 'calendar'}}
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
                onPress={()=> pesquisar()}
            />
            <Text style={{fontSize:20, opacity: (preco !== null)? 1 : 0}}>
              {"\n"}
              Gasto Mensal do mês {mes} do ano {ano} foi de {preco} reais!
            </Text>
        </View>
    );
}
function Compras(){
    const [nome, setNome] = useState(null)
    const [quantidade, setQuant] = useState(null)
    const [preco, setPreco] = useState(null)
    const [data, setData] = useState(null)
    const api = axios.create({
      baseURL: "http://172.18.9.216:8000",
    });

    const cadastrar = async () => {
      const id = await AsyncStorage.getItem('id')
      await api.post("/racao", { 
        nome: nome,
        quantidade: quantidade,
        preco: preco,
        data: data,
        usuario_fk: id })
      .then(res => {
        console.log(res.data[0]);
        alert("Ração cadastrada com sucesso!")
      }).catch(function (error) {
        alert("Ocorreu um erro no cadastro da compra! Por favor conferir as informações novamente.")
      })
    }

    return(
        <View style={styles.container}>
            <Text h3>Cadastre a compra de uma nova ração abaixo: {"\n"}</Text>
            <Input 
                placeholder="Nome da Ração"
                placeholderTextColor="#354355"
                leftIcon={{type: 'font-awesome', name: 'angle-right'}}
                onChangeText={value => setNome(value)}
                keyboardType="default"
            />
            <Input 
                placeholder="Quantidade"
                placeholderTextColor="#354355"
                leftIcon={{type: 'font-awesome', name: 'angle-right'}}
                onChangeText={value => setQuant(value)}
                keyboardType="number-pad"
            />
            <Input 
                placeholder="Preço"
                placeholderTextColor="#354355"
                leftIcon={{type: 'font-awesome', name: 'money'}}
                onChangeText={value => setPreco(value)}
                keyboardType="decimal-pad"
            />
            <Input 
                placeholder="Data da compra"
                placeholderTextColor="#354355"
                leftIcon={{type: 'font-awesome', name: 'calendar'}}
                onChangeText={value => setData(value)}
                keyboardType="number-pad"
            />
            <Button
                title="Cadastrar"
                onPress={()=> cadastrar()}
            />
        </View>
    );
}
function Sobre({navigation}){

    const senha = () => {
        navigation.reset({
            index: 0,
            routes: [{name: "Home"}]
          })
    }
    const logout = () => {
        navigation.reset({
            index: 0,
            routes: [{name: "Login"}]
          })
    }

    return(
        <View style={styles.container}>
            <Image source={icon} style={styles.imageSize}></Image>
            <Text h2>Controle Pet</Text>
            <Text h4>Esse sistema foi construído para que o usuário podesse ter
                melhor controle da ração do seu cachorro, com funcionalidades de 
                adicionar suas compras de ração e checar o gasto mensal de ração 
                da data escolhida!
                {"\n"}
            </Text>
            <Text h4>
                Para relato de problemas ou mais informações contactar:
                {"\n"}
                Telefone: (85) 99248-2002
                {"\n"}
                Email: victorsantos@unifor.br
                {"\n"}
            </Text>
            <View style={styles.horizontal}>
                <View style={styles.buttonColor}> 
                <Button
                    title="Mudar Senha"
                    onPress={()=> senha()}
                />
                </View>
                <View style={styles.buttonColor}> 
                <Button
                    title="LogOut"
                    onPress={()=> logout()}
                />
                </View>
            </View>
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
      backgroundColor: '#e47087',
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
    },
    buttonColor:{
        flex: 1,
        paddingLeft: 10,
    }
  });
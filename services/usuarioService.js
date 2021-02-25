import React,{ useState} from 'react';
import axios from 'axios';
import { Alert } from 'react-native';

const api = axios.create({
    baseURL: "http://172.18.9.216:8000",
  });

export async function LoginFunc(email,senha){
    const url = `http://172.18.9.216:8000/usuario/login/`;

    await api.post("/usuario/login/", { 
        email: email,
        senha: senha })
    .then(res => {
        console.log(res.data[0]);
        if(res.data[0] != null) {
            return true;
        } else {
            Alert.alert("Usuário não encontrado! Por favor checar email ou senha.");
        }
    })
    .catch(err => console.log('Erro:', err));
}
import { View, Text, TextInputComponent, TextInput, Button, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from "react";
import { useNavigation, useRouter } from 'expo-router'
import PasswordIcon from 'react-native-vector-icons/Feather'
import { jwtDecode } from 'jwt-decode'
import url from "../../../config/url";


function LoginForm({ setRegister }: any) {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [passVis, setPassVis] = useState(true);
    const loggedUser = {id_u: 0, username: "string", logged: false}

    const navigation: any = useNavigation();

    const router = useRouter()
    

    const _setLogin = async (loggedUser: {id_u: number, username: string, logged: boolean}) => {
        try{
          await AsyncStorage.setItem('user', JSON.stringify(loggedUser));
          await AsyncStorage.setItem('loged', "true")
        }
        catch(error){
          alert("something went wrong")
        }
        navigation.replace("(account)")
    }

    const loging = async () => {
        try{
            const response = await fetch(`${url}/login?username=${login}&password=${password}`, {method: "POST"})
            
            if(!response.ok){
              alert("No user found")
              console.error("something went wrong")
            }
            
            
            const token = await response.text()
            console.log(token);
            
            const user = jwtDecode(token)
            if(user !== undefined){
              loggedUser.id_u = Number(user.sub)
              loggedUser.username = user.name
              _setLogin(loggedUser)
            }
          }catch (error){
            console.error('Error: ', error)
          }
    }

  return (
    <>
        <View style={{ 
        display: 'flex',
        justifyContent: "center",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 30,
        width: "70%",
        margin: "auto",
        padding: 20
       }}>
        <Text style={{ 
          textAlign: 'center',
          fontSize: 40,
          fontWeight: 600
         }}>LOGIN</Text>
         <Pressable style={{ 
                   width: "100%",
                   height: 20,
                   backgroundColor: "blue",
                  }} onPress={() => {
                     setRegister(true);
                   }}>
                     <Text style={{ textAlign: "center", color: "white" }}>REGISTER</Text>
                 </Pressable>
        <View style={{ 
          margin: "auto",
          width: "80%"
         }}>
          <Text style={{ 
            textAlign: 'left',
            fontSize: 20,
            fontWeight: 600
           }}>Username:</Text>
          <TextInput style={{ 
            borderWidth: 1,
            borderStyle: "solid",
            width: "100%",
            height: 40,
            textAlign: 'center'
           }} value={login} onChangeText={(newText) => setLogin(newText)} />
        </View>
        
        <View style={{ 
          margin: "auto",
          width: "80%",
          marginBottom: 15
         }}>
          <Text style={{ 
            textAlign: 'left',
            fontSize: 20,
            fontWeight: 600
           }}>Password: </Text>
          <View style={{ flex:1, flexDirection: "row" }}>
            <TextInput style={{ 
              borderWidth: 1,
              borderStyle: "solid",
              width: "80%",
              height: 40,
              textAlign: 'center'
            }} secureTextEntry={passVis} value={password} onChangeText={(newText) => setPassword(newText)}  />
            <Pressable style={{ 
              height: 5,
              width: 5
            }} onPress={() => {
              setPassVis(!passVis);
            }}>
              <PasswordIcon style={{ 
                borderWidth: 1,
                borderStyle: "solid",
                width: 40,
                height: 40,
                textAlign: 'center',
                alignItems: 'center'
               }} name='eye-off' size={35} />
            </Pressable>
          </View>
        </View>
        <Pressable style={{ 
          width: "80%",
          marginTop: 40,
          margin: "auto",
          borderWidth: 1,
          borderStyle: "solid"
         }} onPress={loging}>
          <Text style={{ textAlign: 'center' }}>Login</Text>
        </Pressable>
      </View>
    </>
  )
}

export default LoginForm
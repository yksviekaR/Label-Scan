import { View, Text, TextInputComponent, TextInput, Button, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { CameraView } from 'expo-camera'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from "react";
import { useNavigation } from 'expo-router'
import PasswordIcon from 'react-native-vector-icons/Feather'
import url from "../../../config/url";


function RegisterForm({ setRegister }: any) {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConf, setPasswordConf] = useState("");
    const [passVis, setPassVis] = useState(true);

    const navigation: any = useNavigation();
    

    const _setLogin = async () => {
        try{
          await AsyncStorage.setItem('loged', "true")
        }
        catch(error){
          alert("something went wrong")
        }
        navigation.replace('index')
    }

    const register = () => {
      if(password == passwordConf){
        
        fetch(`${url}/register?username=${login}&password=${password}`, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
        }).then(() => {
          console.log("New User added")
        }).catch((error) =>{
          console.error(error);
          
        });
        setRegister(false)
      }else{
        alert("password missmatch")
        setLogin("")
        setPassword("")
        setPasswordConf("")
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
         }}>REGISTER</Text>
         <Pressable style={{ 
                   width: "100%",
                   height: 20,
                   backgroundColor: "blue",
                  }} onPress={() => {
                     setRegister(false);
                   }}>
                     <Text style={{ textAlign: "center", color: "white" }}>LOGIN</Text>
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
            height:40,
            textAlign: 'center',
           }} value={login} onChangeText={(newText) => setLogin(newText)} />
        </View>
        
        <View style={{ 
          margin: "auto",
          width: "80%",
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
              width: "100%",
              height: 40,
              textAlign: 'center',
              minHeight: "auto"
            }} secureTextEntry={true} value={password} onChangeText={(newText) => setPassword(newText)}  />
          </View>
        </View>
        <View style={{ 
          margin: "auto",
          width: "80%",
          marginTop: 40,
          marginBottom: 18
         }}>
          <Text style={{ 
            textAlign: 'left',
            fontSize: 20,
            fontWeight: 600
           }}>Confirm Password: </Text>
          <TextInput style={{ 
            borderWidth: 1,
            borderStyle: "solid",
            width: "100%",
            height: 40,
            textAlign: 'center',
            minHeight: "auto"
          }} secureTextEntry={true} value={passwordConf} onChangeText={(newText) => setPasswordConf(newText)}  />
        </View>
        <Pressable style={{ 
          width: "80%",
          margin: "auto",
          height: 40,
          borderWidth: 1,
          borderStyle: "solid"
         }} onPress={register}>
          <Text style={{ textAlign: 'center', margin: "auto" }}>Register</Text>
        </Pressable>
      </View>
    </>
  )
}

export default RegisterForm
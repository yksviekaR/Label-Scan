import { View, Text, TextInputComponent, TextInput, Button, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { CameraView } from 'expo-camera'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from "react";
import { useNavigation } from 'expo-router'
import newSnack from '../(newSnack)/newSnack'
import PasswordIcon from 'react-native-vector-icons/Feather'
import LoginForm from './components/loginForm'
import RegisterForm from './components/registerForm'


const login = () => {

  const navigation: any = useNavigation();

  
  const [register, setRegister] =  useState(false);


  return (
    <View style={{ 
        display: 'flex',
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        margin: 'auto'
     }}>
      {(register == false) ? <LoginForm setRegister={setRegister} /> : <RegisterForm setRegister={setRegister} />}
    </View>
  )
}

export default login
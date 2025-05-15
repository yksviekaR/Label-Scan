import { View } from 'react-native'
import React from 'react'
import { useState } from "react";
import LoginForm from './components/loginForm'
import RegisterForm from './components/registerForm'
import { useIsFocused } from '@react-navigation/native'


const login = () => {


  const isFocused = useIsFocused()

  
  const [register, setRegister] =  useState(false);


  return (
    isFocused ? <View style={{ 
        display: 'flex',
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        margin: 'auto'
     }}>
      {(register == false) ? <LoginForm setRegister={setRegister} /> : <RegisterForm setRegister={setRegister} />}
    </View> : null
  )
}

export default login
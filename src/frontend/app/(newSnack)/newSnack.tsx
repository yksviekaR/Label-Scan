import { View, Text, TextInputComponent, TextInput, Button } from 'react-native'
import React, { useEffect } from 'react'
import { CameraView } from 'expo-camera'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from "react";
import { useNavigation } from 'expo-router'

const newSnack = () => {

  return (
    <View style={{ 
        display: 'flex',
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        margin: 'auto'
     }}>
      
    </View>
  )
}

export default newSnack
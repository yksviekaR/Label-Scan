import { View, Text, TouchableOpacity, Button } from 'react-native'
import React, { useState } from 'react'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { SafeAreaView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from 'expo-router'
import FlashIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import CancelIcon from 'react-native-vector-icons/Ionicons'
import { useIsFocused } from '@react-navigation/native'

const camera = () => {

  const navigation: any = useNavigation();
  const isFocus = useIsFocused()
  const [permission, requestPermission] = useCameraPermissions()

  const [torch, setTorch] = useState(false)
  const [isCameraReady, setCameraReady] = useState(false)

  const _setCode = async (data: any) => {
    try{
      await AsyncStorage.setItem('codeTemp', data)
    }
    catch(error){
      alert("something went wrong")
    }
    navigation.replace("index")
  }

  if(!permission?.granted){
    return <View>
      <Text>No permission recived</Text>
      <View style={{ 
        margin: "0 auto",
        width: "50%"
       }}>
        <Button title="Go back" onPress={() =>{
          navigation.replace("index")
        }} />
      </View>
    </View>
  }

  return (
    isFocus ? <View>
      <SafeAreaView style={{ 
        display: "flex",
        height: "100%",
       }}>
        <CameraView facing='back' enableTorch={torch} onBarcodeScanned={({data}) => {_setCode(data)}} onCameraReady={() =>{
          setCameraReady(true)
        }} style={{ 
          flex: 1
         }} />
         <View style={{ 
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          width: "100%",
          height: "100%",
          }}>
            <View style={{ 
              margin: "0 auto",
              width: 250,
              height: 250,
              borderWidth: 4,
              borderStyle: 'solid',
              borderColor: "white",
              borderRadius: 30
             }}>

            </View>
            
         </View>
         <View style={{ 
              position: 'absolute',
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: "row",
              margin: "0 auto",
              width: "100%",
              height: "15%",
              bottom: 0,
              backgroundColor: "rgba(44, 44, 44, 0.45)"
             }}>
              <TouchableOpacity style={{ 
                margin: "auto",
                width: 80,
                height: 80,
                backgroundColor: "rgba(45, 45, 45, 0.59)",
                borderRadius: 40,
                justifyContent: 'center',
                alignItems: 'center'
               }} onPress={() =>{
                setTorch(!torch)
               }}>
                <FlashIcon name={torch ? "flashlight" : "flashlight-off" } size={40} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={{ 
                margin: "auto",
                width: 80,
                height: 80,
                backgroundColor: "rgba(45, 45, 45, 0.59)",
                borderRadius: 40,
                justifyContent: 'center',
                alignItems: 'center'
               }} onPress={() =>{
                navigation.replace("index")
               }}>
                <CancelIcon name='return-down-back' size={40} color="#fff" />
              </TouchableOpacity>
            </View>
      </SafeAreaView>
    </View> : null
  )
}

export default camera
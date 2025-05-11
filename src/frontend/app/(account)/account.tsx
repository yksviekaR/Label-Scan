import { View, Text, Button } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { CameraView } from 'expo-camera'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useFocusEffect,  } from 'expo-router'
import { useIsFocused } from '@react-navigation/native'

const account = () => {

  const navigation: any = useNavigation();

  const [loggedUser, setLoggedUser] = useState<{id_u: number, username: string}>()

  const isFocus = useIsFocused()

  useFocusEffect(
      useCallback(()=>{
        _retriveLoggedUser();
      }, [])
    )

  const _delog = async () => {
      try{
        await AsyncStorage.setItem('loged', "false")
        await AsyncStorage.setItem('user', "")
      }
      catch(error){
        alert("something went wrong")
      }
      navigation.navigate('index')
    }

    const _retriveLoggedUser = async () =>{
      try{
        const value = await AsyncStorage.getItem('user')
        // console.log(val)
        if(value !== null){
          setLoggedUser(JSON.parse(value))
        }
      }
      catch (error){
        alert("something went wrong")
      }
    }

  return (
    isFocus ? <View style={{ 
      display: 'flex',
      justifyContent: 'center',
      flexDirection: "column"
     }}>
      <View style={{ 
        width: "100%",
        height: "auto",
        marginTop: "50%"
       }}>
        <Text style={{ textAlign: 'center', fontSize: 20 }}>You are loged in</Text>
        <Text style={{ textAlign: 'center', fontSize: 30, marginBottom: 20 }}>Welcome! {loggedUser?.username}</Text>
        <View style={{ 
          margin: "auto",
          marginBottom: 10,
          width: "90%",
          height: 40
         }}>
          <Button title='logof' onPress={_delog}/>
        </View>
        <View style={{ 
          margin: "auto",
          width: "90%",
          height: 40
         }}>
        <Button title='Menu' onPress={() => {
          navigation.navigate('index')
        }}/>
        </View>
      </View>
      
    </View> : null
  )
}

export default account
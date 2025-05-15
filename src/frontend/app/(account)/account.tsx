import { View, Text, Button } from 'react-native'
import React, { useState, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useFocusEffect, useRouter, useLocalSearchParams,  } from 'expo-router'
import { useIsFocused } from '@react-navigation/native'


const account = () => {

  const navigation: any = useNavigation();
  const router = useRouter()

  const [loggedUser, setLoggedUser] = useState<{id_u: number, username: string}>()
  const {check} = useLocalSearchParams()

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
        navigation.replace('index')
      }
      catch(error){
        alert("something went wrong")
      }
      
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
          <Button title='logout' onPress={_delog}/>
        </View>
        <View style={{ 
          margin: "auto",
          width: "90%",
          height: 40
         }}>
        <Button title='Menu' onPress={() => {
          navigation.replace("index")
        }}/>
        </View>
      </View>
      
    </View> : null
  )
}

export default account
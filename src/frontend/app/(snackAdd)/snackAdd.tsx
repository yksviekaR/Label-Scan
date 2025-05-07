import { Link, useFocusEffect } from "expo-router";
import React from "react";
import { useEffect, useState } from "react";
import { Text, View, Button, Pressable, Modal, ScrollView } from "react-native";
import { useCameraPermissions } from "expo-camera"
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Route } from "expo-router/build/Route";
import { useRoute } from "@react-navigation/native";
import Populated from "./components/populated";
import Empty from "./components/empty";
import { loadOptions } from "@babel/core";

const snackAdd = () => {

    const navigation = useNavigation()


    const [snacks, setSnacks] = useState<Array<{id_s: number, id_u: number, snackName: string, energyValue: number, fat: number, ofWhichSaturates: number, carbohydrates: number, ofWhichSugars: number, protein: number, salt: number, fiber: number, mass: number, ingredients: string}>>()

    const [loggedUser, setLoggedUser] = useState<{id_u: number, username: string}>()
        
    const [anySnacks, setAnySnacks] = useState(false);


    useEffect(() => {
      getSnacks()
    }, [])

    const _retriveLoggedUser = async () =>{
        try{
          const value = await AsyncStorage.getItem('user')          
          // console.log(val)
          if(value !== null){
            const prepValue = JSON.parse(value)
            setLoggedUser(prepValue)
          }
        }
        catch (error){
          alert("something went wrong")
        }
        console.log(loggedUser) + " user"
      }

    const getSnacks = async () =>{
        try{
          const value = await AsyncStorage.getItem('user')          
          // console.log(val)
          if(value !== null){
            const prepValue = JSON.parse(value)
          
            const response = await fetch(`https://ruling-together-prawn.ngrok-free.app/api/UserSnacksControler/GetSnackOfUser/${prepValue.id_u}`)
            
            if(!response.ok){
              console.error("something went wrong")
            }

            const data = await response.json()

            if(data === undefined){
              setAnySnacks(false)
            }else{
              setSnacks(data)
              setAnySnacks(true)
            }
          }
        }catch (error){
          console.error('Error: ', error)
        }        
    }

  return (
    <>
        {(anySnacks == true) ? <Populated snacks={snacks} setSnacks={setSnacks} /> : <Empty />}
    </>
  )
}

export default snackAdd
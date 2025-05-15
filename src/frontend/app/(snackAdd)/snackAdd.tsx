import { useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import { useState } from "react";
import { useNavigation } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from "@react-navigation/native";
import Populated from "./components/populated";
import Empty from "./components/empty";
import url from "../../config/url";


const snackAdd = () => {

    const navigation = useNavigation()

    const isFocused = useIsFocused()


    const [snacks, setSnacks] = useState<Array<{id_s: number, id_u: number, snackName: string, energyValue: number, fat: number, ofWhichSaturates: number, carbohydrates: number, ofWhichSugars: number, protein: number, salt: number, fiber: number, mass: number, ingredients: string}>>()

    const [loggedUser, setLoggedUser] = useState<{id_u: number, username: string}>()
        
    const [anySnacks, setAnySnacks] = useState(false);


    useFocusEffect(
      useCallback(() =>{
        getSnacks()
      }, [])
    )

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
          
            const response = await fetch(`${url}/api/UserSnacksControler/GetSnackOfUser/${prepValue.id_u}`)
            
            if(!response.ok){
              console.error("something went wrong")
            }

            const data = await response.json()

            if(Array.isArray(data) && data.length != 0){
              setSnacks(data)
              setAnySnacks(true)
            }else{
              
              setAnySnacks(false)
            }
            console.log(data);
            
          }
        }catch (error){
          console.error('Error: ', error)
        }        
    }

  return (
    isFocused ? <>
        {(anySnacks == true) ? <Populated snacks={snacks} setSnacks={setSnacks} /> : <Empty />}
    </> : null
  )
}

export default snackAdd
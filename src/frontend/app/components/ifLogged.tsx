import { Link, useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { Text, View, Button, Pressable, Modal, ScrollView } from "react-native";
import { useCameraPermissions } from "expo-camera"
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Route } from "expo-router/build/Route";
import Empty from './empty'
import Populated from './populated'


function IfLogged({ loggedUser, setSnackVis }: any) {


    const [snacks, setSnacks] = useState<Array<{id_s: number, id_u: number, snackName: string, energyValue: number, fat: number, ofWhichSaturates: number, carbohydrates: number, ofWhichSugars: number, protein: number, salt: number, fiber: number, mass: number, ingredients: string}>>()
    

    const [anySnacks, setAnySnacks] = useState(false)

    useFocusEffect(
      useCallback(() =>{
        getSnacks();
      }, [])
    )


    const getSnacks = async () =>{
        try{
          const response = await fetch(`https://ruling-together-prawn.ngrok-free.app/api/UserSnacksControler/GetSnackOfUser/${loggedUser?.id_u}`)
          
          if(!response.ok){
            console.error("something went wrong")
          }

          const data = await response.json()

          if(data === undefined){
            setAnySnacks(false)
          }else{
            setAnySnacks(true)
            setSnacks(data)
          }
          console.log(data)
        }catch (error){
          console.error('Error: ', error)
        }
        
    }
    
  return (
    <>
        {(anySnacks == true) ? <Populated snacks={snacks} setSnacks={setSnacks} setSnackVis={setSnackVis} /> : <Empty setSnackVis={setSnackVis} />}
    </>
  )
}

export default IfLogged
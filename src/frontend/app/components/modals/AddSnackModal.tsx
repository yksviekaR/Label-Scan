import React, { useCallback } from 'react'
import { useFocusEffect } from "expo-router";
import { useState } from "react";
import { Text, View, Button, Modal, TextInput } from "react-native";
import { useNavigation } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from "../../../config/url";


const AddSnackModal = ({ snackVis, setSnackVis}: any) => {


  const navigation: any = useNavigation();

  const [snackName, setSnackName] = useState("")
  const [loggedUser, setLoggedUser] = useState<{id_u: number, username: string}>()

  useFocusEffect(
    useCallback(() =>{
      _retriveLoggedUser()
    }, [])
  )

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
  const addSnack = () =>{
    const newSnack = {
      id_u: loggedUser?.id_u,
      snackName: snackName,
      ingredients: "[]"
    }
    fetch(`${url}/api/UserSnacksControler`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSnack)
    }).then(() => {
      console.log("New Item added")
    }).catch(err =>{
      console.error(err);
      alert("something went wrong try again")
      setSnackName("")
      return
    })
    setSnackVis(false)
  }

  return (
    <>
        <Modal visible={snackVis} style={{ 
          display: 'flex',
          justifyContent: 'center',
         }}>
          <View style={{ 
            marginTop: "60%",
            width: "90%",
            marginLeft: "auto",
            marginRight: "auto"
           }}>
            <Text style={{ 
                textAlign: 'center',
                fontSize: 30
             }}>CREATE SNACK</Text>
             <View style={{ 
                display: 'flex',
                justifyContent: 'center',
                flexDirection: "column",
                margin: "auto",
                width: "80%",
                marginTop: 10
              }}>
                <Text style={{ 
                  textAlign: 'center', textTransform: "uppercase"
                 }}>
                    ENTER SNACK NAME: 
                </Text>
                <TextInput style={{ 
                    borderWidth: 1,
                    borderStyle: "solid",
                    width: "100%",
                    height: 40,
                    color: "#000",
                    textAlign: 'center' }} value={snackName} onChangeText={(text) => setSnackName(text)} />

                <Button title='CREATE' onPress={addSnack} />
                <Button title='BACK' onPress={() => {setSnackVis(false)}} />
             </View>
          </View>   
        </Modal>
    </>
  )

}

export default AddSnackModal
import { View, Text, TextInputComponent, TextInput, Button } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { CameraView } from 'expo-camera'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from "react";
import { useNavigation, useFocusEffect } from 'expo-router'

const add = () => {

  //  const [newItem, setDataTest] = useState<{id_i: number, itemName: string, barcode: string, description: string, energyValue: number, fat: number, ofWhichSaturates: number, carbohydrates: number, ofWhichSugars: number, protein: number, salt: number, fiber: number, mass: number}>()

  const [code, setCode] = useState("");

  var newItem: {id_i: number, itemName: string, barcode: string, description: string, energyValue: number, fat: number, ofWhichSaturates: number, carbohydrates: number, ofWhichSugars: number, protein: number, salt: number, fiber: number, mass: number} = {id_i: 0, itemName: "", barcode: code, description: "", energyValue: 0, fat: 0, ofWhichSaturates: 0, carbohydrates: 0, ofWhichSugars: 0, protein: 0, salt: 0, fiber: 0, mass: 0}

  

  const navigation: any = useNavigation();

  useFocusEffect(
    useCallback(()=>{
      _retriveCodeTemp();
    }, [])
  )

  const postItem = () => {
    fetch('https://ruling-together-prawn.ngrok-free.app/api/Items', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem)
    }).then(() => {
      console.log("New Item added")
    }).catch((err) =>{
      console.error(err);
      
    })
    console.log(newItem)
    newItem = {id_i: 0, itemName: "", barcode: "", description: "", energyValue: 0, fat: 0, ofWhichSaturates: 0, carbohydrates: 0, ofWhichSugars: 0, protein: 0, salt: 0, fiber: 0, mass: 0}

    _clearCodeTemp();
    navigation.navigate('index')
  }

  const _retriveCodeTemp = async () =>{
    try{
      const value = await AsyncStorage.getItem('codeTemp')
      if(value !== null){
        setCode(value)
      }
    }
    catch (error){
      alert("something went wrong")
    }
  }

  const _clearCodeTemp = async () =>{
    try{
      AsyncStorage.removeItem('codeTemp')
      setCode("undefined")
    }
    catch (error){
      alert("something went wrong")
    }
  }

  return (
    <View>
      <Text style={{ textAlign: 'center' }}>New Item form</Text>
      <View style={{ 
        display: 'flex',
        width: "80%",
        justifyContent: 'center',
        flexDirection: "column",
        marginLeft: 'auto',
        marginRight: 'auto'
       }}>
        <Text style={{ textAlign: 'center' }}>Item name: </Text><TextInput style={{ 
          borderWidth: 1,
          borderRadius: 3,
          textAlign: 'center'

         }} onChangeText={(newItemName) => {
          newItem.itemName = newItemName
        }} />
        <Text style={{ textAlign: 'center' }}>Barcode: </Text><TextInput readOnly={true} style={{ 
          borderWidth: 1,
          borderRadius: 3,
          textAlign: 'center'

         }} onChangeText={(newBarcode) => {
          newItem.barcode = newBarcode
        }} value={code} />
        <Text style={{ textAlign: 'center' }}>Description</Text><TextInput style={{ 
          borderWidth: 1,
          borderRadius: 3,
          textAlign: 'center'

         }} maxLength={200} multiline={true}  onChangeText={(newDescription) => {
          newItem.description = newDescription 
        }} />
        <Text style={{ textAlign: "center" }}>(if there is no calorie table entity on your product leave it blank{"\n"}insert values based on grams per 100g of product)</Text>
        <View style={{ 
          marginTop: 20,
          marginBottom: 20,
          display: "flex",
          justifyContent: 'space-between',
          flexDirection: "row"
         }}>
          <View style={{
            display: "flex",
            justifyContent: 'center',
            flexDirection: "column",
            flex: 50,
            width: "50%"
           }}>
            <Text style={{ textAlign: 'center' }}>Energy value: </Text><TextInput style={{ 
              borderWidth: 1,
              borderRadius: 3,
              textAlign: 'center'

              }} onChangeText={(newEV) => {
                newItem.energyValue = Number(newEV)
            }} />
            <Text style={{ textAlign: 'center' }}>Fat: </Text><TextInput style={{ 
              borderWidth: 1,
              borderRadius: 3,
              textAlign: 'center'

              }} onChangeText={(newFat) => {
                newItem.fat = Number(newFat)
            }} />
            <Text style={{ textAlign: 'center' }}>Of Which Saturates: </Text><TextInput style={{ 
              borderWidth: 1,
              borderRadius: 3,
              textAlign: 'center'

              }} onChangeText={(newOFS) => {
                newItem.ofWhichSaturates = Number(newOFS)
            }} />
            <Text style={{ textAlign: 'center' }}>Protein: </Text><TextInput style={{ 
              borderWidth: 1,
              borderRadius: 3,
              textAlign: 'center'

              }} onChangeText={(newprotein) => {
                newItem.protein = Number(newprotein)
            }} />
          </View>
          <View style={{
            display: "flex",
            justifyContent: 'center',
            flexDirection: "column",
            flex: 50,
            width: "50%"
           }}>
            <Text style={{ textAlign: 'center' }}>Salt: </Text><TextInput style={{ 
              borderWidth: 1,
              borderRadius: 3,
              textAlign: 'center'

              }} onChangeText={(newsalt) => {
                newItem.salt = Number(newsalt)
            }} />
            <Text style={{ textAlign: 'center' }}>Carbohydrates: </Text><TextInput style={{ 
              borderWidth: 1,
              borderRadius: 3,
              textAlign: 'center'

              }} onChangeText={(newCarb) => {
                newItem.carbohydrates = Number(newCarb)
            }} />
            <Text style={{ textAlign: 'center' }}>of which sugars: </Text><TextInput style={{ 
              borderWidth: 1,
              borderRadius: 3,
              textAlign: 'center'

              }} onChangeText={(newOFS) => {
                newItem.ofWhichSugars = Number(newOFS)
            }} />
            <Text style={{ textAlign: 'center' }}>Fiber: </Text><TextInput style={{ 
              borderWidth: 1,
              borderRadius: 3,
              textAlign: 'center'

              }} onChangeText={(newFiber) => {
                newItem.fiber = Number(newFiber)
            }} />
          </View>
        </View>
        <Button title='Confirm' onPress={() => {postItem()}} />
      </View>
    </View>
  )
}

export default add
import React, { useCallback } from 'react'
import { Link, useFocusEffect } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, Button, Pressable, Modal, ScrollView } from "react-native";
import { useCameraPermissions } from "expo-camera"
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Route } from "expo-router/build/Route";

const FoundModal = ({ foundVis, setFoundVis, item, setItem, _clearCodeTemp }: any) => {

  const navigation: any = useNavigation();

  const [logged, setLogged] = useState(false)

  useFocusEffect(
      useCallback(() =>{
        _checkLogged();
      }, [])
  )

  const _checkLogged = async () =>{
    try{
      const value = await AsyncStorage.getItem('loged')
      if(value !== null){
        setLogged(JSON.parse(value))
      }
    }
    catch (error){
      alert("something went wrong")
    }
  }

  return (
    <>
        <Modal visible={foundVis}>
          <View style={{ 
            display: 'flex',
            width: "80%",
            justifyContent: 'center',
            flexDirection: "column",
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: "60%"
            }}>
            <Text style={{ textAlign: 'center', fontSize: 25, textTransform: "uppercase" }}>Item name: {`\n`} {item?.itemName}</Text>
            <Text style={{ textAlign: 'center', fontSize: 20, textTransform: "uppercase" }}>Barcode: {`\n`} {item?.barcode}</Text>
            <Text style={{ textAlign: 'center', textTransform: "uppercase" }}>{item?.description}</Text>
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
                <Text style={{ textAlign: 'center', textTransform: "uppercase" }}>Energy value: {item?.energyValue}</Text>
                <Text style={{ textAlign: 'center', textTransform: "uppercase" }}>Fat: {item?.fat}</Text>
                <Text style={{ textAlign: 'center', textTransform: "uppercase" }}>Of Which Saturates: {item?.ofWhichSaturates}</Text>
                <Text style={{ textAlign: 'center', textTransform: "uppercase" }}>Protein: {item?.protein}</Text>
                </View>
                <View style={{
                display: "flex",
                justifyContent: 'center',
                flexDirection: "column",
                flex: 50,
                width: "50%"
                }}>
                <Text style={{ textAlign: 'center', textTransform: "uppercase" }}>Salt: {item?.salt}</Text>
                <Text style={{ textAlign: 'center', textTransform: "uppercase" }}>Carbohydrates: {item?.carbohydrates}</Text>
                <Text style={{ textAlign: 'center', textTransform: "uppercase" }}>of which sugars: {item?.ofWhichSugars}</Text>
                <Text style={{ textAlign: 'center', textTransform: "uppercase" }}>Fiber: {item?.fiber}</Text>
                </View>
            </View>
            </View>
            <View style={{ 
              width: "80%",
              height: 50,
              marginInline: "auto",
              marginBottom: "1%"
             }}>
              <Button title='ADD to snack' disabled={!logged} onPress={() => {
                setFoundVis(false)
                setItem(undefined)
                navigation.navigate("(snackAdd)")
              }} />
            </View>
            <View style={{ 
              width: "80%",
              marginInline: "auto",
              height: 50,
             }}>
              <Button title='BACK' onPress={() => {
                setFoundVis(false)
                setItem(undefined)
                _clearCodeTemp()
              }} />
            </View> 
        </Modal>
    </>
  )
}

export default FoundModal
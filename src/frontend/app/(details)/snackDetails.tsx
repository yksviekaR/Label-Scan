import { Link, useFocusEffect} from "expo-router";
import React, { useLayoutEffect } from "react";
import { useEffect, useState, useCallback } from "react";
import { Text, View, Button, Pressable, Modal, ScrollView, TouchableOpacity } from "react-native";
import { useCameraPermissions } from "expo-camera"
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Route } from "expo-router/build/Route";
import IngDetailsModal from "./modals/IngDetailsModal";


const snackDetails = () => {

    const {snackName, ingredients} = useLocalSearchParams<{snackName: string, ingredients: string}>()
    const navigation = useNavigation()

    const [ingr, setIngr] = useState<Array<{Id: string, ItemName: string, Barcode: string, Dose: string}>>()
    const [detailsVis, setDetailsVis] = useState(false)
    const [item, setItem] = useState<{id_i: number, itemName: string, barcode: string, description: string, energyValue: number, fat: number, ofWhichSaturates: number, carbohydrates: number, ofWhichSugars: number, protein: number, salt: number, fiber: number, mass: number}>()

    useFocusEffect(
        useCallback(() =>{
            setIngr(JSON.parse(ingredients))
        }, [])
    )

    const getItems = async (barcode: string) =>{
        try{
          
          if(barcode !== null){
            const response = await fetch(`https://ruling-together-prawn.ngrok-free.app/api/Items/GetByBarcode/${barcode}`)
          
            if(!response.ok){
              console.error("something went wrong")
            }
    
            const data = await response.json()
    
            setItem(data)
            setDetailsVis(true)
          }
          
        }catch (error){

        }
        
      }

  return (
    <>
        <IngDetailsModal detailsVis={detailsVis} setDetailsVis={setDetailsVis} item={item} setItem={setItem} />
        <View style={{ 
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
         }}>
            <View>
                <Text>Snack name: {snackName}</Text>
                <Text>Ingredients:</Text>
                <ScrollView>
                    {ingr && ingr.map((i: any, index: number) => {
                        return(
                            <View key={index} style={{ 
                                margin: "auto",
                                marginBottom: 10
                            }}>
                                <Button title={`${i.ItemName}\n Barcode: ${i.Barcode} \n Dose(g): ${i.Dose}`} onPress={({e, barcode}: any) => {
                                    getItems(barcode)
                                    
                                }} />
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        </View>
    </>
  )
}

export default snackDetails
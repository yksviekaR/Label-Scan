import { Link, useFocusEffect} from "expo-router";
import React, { useLayoutEffect } from "react";
import { useEffect, useState, useCallback } from "react";
import { Text, View, Button, Pressable, Modal, ScrollView, TouchableOpacity } from "react-native";
import { useCameraPermissions } from "expo-camera"
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Route } from "expo-router/build/Route";
import IngDetailsModal from "./modals/IngDetailsModal";
import { useIsFocused } from "@react-navigation/native";
import url from "../../config/url";
import { useSafeAreaInsets } from "react-native-safe-area-context";



const snackDetails = () => {

    const {snackId, snackName, ingredients} = useLocalSearchParams<{snackName: string, ingredients: string, snackId: string}>()
    const navigation:any = useNavigation()
    const isFocused = useIsFocused()
    const insets = useSafeAreaInsets()

    const [ingr, setIngr] = useState<Array<{Id: string, ItemName: string, Barcode: string, Dose: string}>>()
    const [detailsVis, setDetailsVis] = useState(false)
    const [item, setItem] = useState<{id_i: number, itemName: string, barcode: string, description: string, energyValue: number, fat: number, ofWhichSaturates: number, carbohydrates: number, ofWhichSugars: number, protein: number, salt: number, fiber: number, mass: number}>()

    useFocusEffect(
        useCallback(() =>{
            setIngr(JSON.parse(ingredients))
        }, [])
    )

    const getItems = async (barcode: string) =>{
        console.log(barcode);
        
        try{
          if(barcode != null){
            const response = await fetch(`${url}/api/Items/GetByBarcode/${barcode}`)
          
            if(!response.ok){
              console.error("something went wrong")
            }
    
            const data = await response.json()
    
            setItem(data)
            console.log(item);
            
            setDetailsVis(true)
          }
          
        }catch (error){
            console.error(error);
            
        }
        
      }

  return (
    isFocused ? <>
        <IngDetailsModal detailsVis={detailsVis} setDetailsVis={setDetailsVis} item={item} setItem={setItem} snackId={snackId} />
        <View style={{ 
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
         }}>
            <View style={{ 
                marginTop: "20%"
             }}>
                <Text style={{ 
                    fontSize: 25,
                    textAlign: "center",
                    textTransform: "uppercase"
                 }}>Snack name: </Text>
                 <Text style={{ 
                    fontSize: 30,
                    textAlign: "center",
                    fontWeight: "600",
                    textTransform: "uppercase"
                  }}>{snackName}</Text>
                <Text style={{ 
                    fontSize: 20,
                    textAlign: "center",
                    textTransform: "uppercase"
                 }}>Ingredients:</Text>
                 {(ingr?.length) != 0 ? <ScrollView>
                    {ingr && ingr.map((i: any, index: number) => {
                        return(
                            <View key={index} style={{ 
                                margin: "auto",
                                marginBottom: 10,
                                maxWidth: "80%"
                            }}>
                                <Button title={`${i.ItemName}\n Barcode: ${i.Barcode} \n Dose(g): ${i.Dose}`} onPress={() => {
                                    getItems(i.Barcode)
                                    
                                }} />
                            </View>
                        )
                    })}
                 </ScrollView> : <View>
                        <Text style={{ 
                            textAlign: "center",
                            fontSize: 15,
                            textTransform: "uppercase"
                         }}>THIS SNACK'S INGREDIENTS {`\n`} LIST IS EMPTY</Text>
                    </View>}
                
            </View>
            
        </View>
        <View style={{ 
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: "15%",
                paddingBottom: insets.bottom
             }}>
                <View style={{ 
                    width: "40%",
                    marginInline: "auto"
                 }}>
                    <Button title="Go Back" onPress={() =>{
                        navigation.replace("index")
                    }} />
                </View>
            </View>
    </> : null
  )
}

export default snackDetails
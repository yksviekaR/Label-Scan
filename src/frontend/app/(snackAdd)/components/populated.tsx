import { Link, useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { Text, View, Button, Pressable, Modal, ScrollView, TextInput } from "react-native";
import { useCameraPermissions } from "expo-camera"
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Route } from "expo-router/build/Route";
import { useRoute } from "@react-navigation/native";
import url from "../../../config/url";


const Populated = ({ snacks, setSnacks }: any) => {

    const navigation:any = useNavigation();

    const [dose, setDose] = useState("")

    const [sn, setSn] = useState<Array<{id_s: number, id_u: number, snackName: string, energyValue: number, fat: number, ofWhichSaturates: number, carbohydrates: number, ofWhichSugars: number, protein: number, salt: number, fiber: number, mass: number, ingredients: string}>>(snacks)

    const [item, setItem] = useState<{id_i: number, itemName: string, barcode: string, description: string, energyValue: number, fat: number, ofWhichSaturates: number, carbohydrates: number, ofWhichSugars: number, protein: number, salt: number, fiber: number, mass: number}>()

    useFocusEffect(
        useCallback(() =>{
            getItem()
        }, [])
    )


    const getItem = async () => {
        try{
            const code = await AsyncStorage.getItem("codeTemp")
            
            if(code !== undefined){
                const response = await fetch(`${url}/api/Items/GetByBarcode/${code}`)

                if(!response.ok){
                    console.error("soemthing went wrong");
                }

                const data = await response.json();

                setItem(data)                
                
            }
        }catch(err){
            console.error(err);
            
        }
    }

    

    const dataConfig = async (id_s: number) =>{
        try{

            const selectedSnack = sn.find((s) =>
                s.id_s === id_s
            );

            if(selectedSnack !== undefined){

                const getIngredients: {Id: string, ItemName: string, Barcode: string, Dose: string}[] = JSON.parse(selectedSnack.ingredients)



                if(item != undefined){
                    const newIngredient: any = {
                        Id: String(item.id_i),
                        ItemName: String(item.itemName),
                        Barcode: String(item.barcode),
                        Dose: dose
                    }
                    

                    getIngredients.push(newIngredient)
    
                    const dataToChange: object = {
                        id_s: selectedSnack.id_s,
                        id_u: selectedSnack.id_u,
                        snackName: selectedSnack.snackName,
                        energyValue: ((item.energyValue != 0) ? Number((selectedSnack.energyValue += (item.energyValue * (Number(dose)/100))).toFixed(2)) : 0),
                        fat: ((item.fat != 0) ? Number((selectedSnack.fat += (item.fat * (Number(dose)/100))).toFixed(2)) : 0),
                        ofWhichSaturates: ((item.ofWhichSaturates != 0) ? Number((selectedSnack.ofWhichSaturates += (item.ofWhichSaturates * (Number(dose)/100))).toFixed(2)) : 0),
                        carbohydrates: ((item.carbohydrates != 0) ? Number((selectedSnack.carbohydrates += (item.carbohydrates * (Number(dose)/100))).toFixed(2)) : 0),
                        ofWhichSugars: ((item.ofWhichSugars != 0) ? Number((selectedSnack.ofWhichSugars += (item.ofWhichSugars * (Number(dose)/100))).toFixed(2)) : 0),
                        protein: ((item.protein != 0) ? Number((selectedSnack.protein += (item.protein * (Number(dose)/100))).toFixed(2)) : 0),
                        salt: ((item.salt != 0) ? Number((selectedSnack.salt += (item.salt * (Number(dose)/100))).toFixed(2)) : 0),
                        fiber: ((item.fiber != 0) ? Number((selectedSnack.fiber += (item.fiber * (Number(dose)/100))).toFixed(2)) : 0),
                        mass: (selectedSnack.mass += Number(dose)),
                        ingredients: JSON.stringify(getIngredients)
        
                    }
                    
                    // console.log(dataToChange);
                    

                    addIngredient(dataToChange, id_s)
                }else{
                    console.log("kurdebele mol")
                }

            }
            
          
               
        }catch (error){
            console.error(error + "3");
        }
        
      }

      const addIngredient = async (dataToChange: object, id_s: number) =>{
        console.log(JSON.stringify(dataToChange))
        console.log(id_s);
        
        
        try{
            const response = await fetch(`${url}/api/UserSnacksControler/${id_s}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(dataToChange)
            })

            if(!response.ok){
                console.log("kd")
            }
            
            console.log("added");
            
            _clearCodeTemp()
            navigation.replace("index")


        }catch(err){
            console.error(err);
            
        }
    }

    const _clearCodeTemp = async () =>{
        try{
          AsyncStorage.removeItem('codeTemp')
        }
        catch (error){
          alert("something went wrong")
        }
    }

    

    

    return (
        <>
            <View style={{ 
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column"
             }}>
                <View style={{ 
                    height: "20%",
                    marginTop: "10%"
                }}>
                    <Text style={{ 
                        textAlign: "center",
                        fontSize: 25,
                        textTransform: "uppercase"
                    }}>ADD INGREDIENT TO SNACK</Text>
                    <TextInput placeholder="Insert Dose" value={dose} onChangeText={newText => setDose(newText)} style={{ 
                        borderWidth: 1,
                        borderStyle: "solid",
                        width: "100%",
                        height: 40,
                        textAlign: 'center',
                        margin: "auto",
                        color: "#0000"
                    }} />
                </View>
                <ScrollView contentContainerStyle={{
                    margin: "0 auto"
                    ,marginTop: 30
                }}>
                    {snacks && snacks.map((i: any, index: number) => {
                        return(
                            <View key={index} style={{ 
                                margin: "auto",
                                marginBottom: 10
                            }}>
                                <Button title={`${i.snackName}`} onPress={(e) => {
                                    e.preventDefault()
                                    if(dose == ""){
                                        alert("remmber to insert dose of product ;)")
                                        return
                                    }else{
                                        dataConfig(i.id_s)
                                    }
                                }} />
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
            
        </>
    )
}

export default Populated
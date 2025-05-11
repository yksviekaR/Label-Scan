import { Link, useFocusEffect } from "expo-router";
import React from "react";
import { useEffect, useState } from "react";
import { Text, View, Button, Pressable, Modal, ScrollView, Touchable, TouchableOpacity } from "react-native";
import { useCameraPermissions } from "expo-camera"
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Route } from "expo-router/build/Route";
import DeleteIcon from 'react-native-vector-icons/MaterialIcons'


function Populated({ snacks, setSnacks, setSnackVis }: any) {

  const router = useRouter()

  const deleteSnack = async (id: any) =>{
    try{
      const response = await fetch(`https://ruling-together-prawn.ngrok-free.app/api/UserSnacksControler/${id}`, {
        method: "DELETE"
      });
      if(!response.ok){
        console.error("something went wrong");
      }
      alert("deleted succesfuly");
      window.location.reload()
    }catch(err){
      console.error(err);
      
    }
  }
    
  return (
    <>
        <View style={{ 
          height: "10%",
          alignContent: "center",
          display: "flex",
          justifyContent: "center",
          width: "100%"
        }}>
          <View>
            <Text style={{ 
              textAlign: "center",
              fontSize: 25,
              fontFamily: "Segoe UI, Roboto",
              fontWeight: 500
            }}>
              SNACK ADD
            </Text>
            <View style={{ 
              alignSelf: "center",
              height: 40,
              backgroundColor: "blue",
              borderRadius: 10,
              width: "40%"
            }}>
              <Button title="ADD" onPress={() =>{
                setSnackVis(true)
              }} />
            </View>
          </View>
        </View>
        <View style={{ 
          height: "75%"
         }}>
          <ScrollView  contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          flexDirection: "column",
          }}>
          {snacks && snacks.map((i: any, index: any) => {
            return(
              <View key={index} style={{ 
                padding: 25,
                borderRadius: 20,
                width: "90%",
                height: 280,
                backgroundColor: "lightblue",
                margin: 20,
                alignSelf: "center"
                }}>
                <Text style={{ textAlign: "center", fontSize: 30, fontWeight: 800, textTransform: "uppercase"  }}>{i.snackName}</Text>
                <View style={{ 
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  }}>
                  <View style={{ 
                  display: "flex",
                  justifyContent: "space-around",
                  flexDirection: "column",
                  }}>
                    <Text style={{ textAlign: 'center', textTransform: "uppercase" }}>Energy value: {i.energyValue}g</Text>
                    <Text style={{ textAlign: 'center', textTransform: "uppercase" }}>Fat: {i.fat}g</Text>
                    <Text style={{ textAlign: 'center', textTransform: "uppercase" }}>Of Which Saturates: {i.ofWhichSaturates}g</Text>
                    <Text style={{ textAlign: 'center', textTransform: "uppercase" }}>Protein: {i.protein}g</Text>         
                  </View>
                  <View style={{ 
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column"
                  }}>
                    <Text style={{ textAlign: 'center', textTransform: "uppercase" }}>Salt: {i.salt}g</Text>
                    <Text style={{ textAlign: 'center', textTransform: "uppercase" }}>Carbohydrates: {i.carbohydrates}g</Text>
                    <Text style={{ textAlign: 'center', textTransform: "uppercase" }}>of which sugars: {i.ofWhichSugars}g</Text>
                    <Text style={{ textAlign: 'center', textTransform: "uppercase" }}>Fiber: {i.fiber}g</Text>
                  </View>
                </View>
                <Text style={{ textAlign: "center", fontStyle:"italic" }}>Per {i.mass}g of snack</Text>
                <View style={{ 
                  marginTop: 10
                 }}> 
                  <Button  title="See ingredients" onPress={() =>{
                    router.push({
                      pathname: "/(details)/snackDetails",
                      params: {snackName: i.snackName, ingredients: i.ingredients, snackId: String(i.id_s)}
                    })
                  }} />
                </View>
                <TouchableOpacity style={{ 
                  width: "20%",
                  marginInline: "auto",
                  justifyContent: "center",
                  marginTop: 5
                 }} onPress={() => {deleteSnack(i.id_s)}}>
                 <DeleteIcon name="delete-forever" size={45} color="rgb(220, 48, 48)" />
                </TouchableOpacity>
              </View>
            )
          })}
        </ScrollView>
        </View>
    </>
  )

  
}

export default Populated
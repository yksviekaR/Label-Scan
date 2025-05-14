import { Link, useFocusEffect } from "expo-router";
import React from "react";
import { useEffect, useState } from "react";
import { Text, View, Button, Pressable, Modal, ScrollView } from "react-native";
import { useCameraPermissions } from "expo-camera"
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Route } from "expo-router/build/Route";


function Empty({ setSnackVis }: any) {
    
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
              fontWeight: 500,
              textTransform: "uppercase"
            }}>
              SNACK ADD
            </Text>
            <View style={{ 
              alignSelf: "center",
              height: 40,
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
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          height: "65%"
         }}>
            <Text style={{ 
              textAlign: "center", textTransform: "uppercase"
             }}>It seems you dont have any snacks saved</Text>
        </View>
    </>
  )
}

export default Empty
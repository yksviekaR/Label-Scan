import { Stack } from "expo-router";
import { useState, useEffect, useLayoutEffect } from "react";
import { Pressable, TouchableOpacity } from "react-native";
import { View, Text, TextInputComponent, TextInput, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from "react-native-vector-icons/FontAwesome"
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function RootLayout() {


  return <Stack>
    <Stack.Screen name="index" options={ ({ navigation }) => ({
      headerRight: () => (
        <TouchableOpacity style={{ 
          justifyContent: "center"
        }} onPressIn={async () => {
          try{
            const value = await AsyncStorage.getItem('loged')
            if(value !== null){
              if(value == "true"){
                navigation.navigate('(account)')
              }else{
                navigation.navigate('(login)')
              }
            }else{
              navigation.navigate('(login)')
            }
          }
          catch (error){
            alert("something went wrong")
          }
        }}>
          <Icon name="user-o" size={50}/>
        </TouchableOpacity>
      ),
      title: "LABEL SCAN",
      headerTitleStyle: {
        fontSize: 40,
        fontWeight: "500",
      },
      
    })} />
    <Stack.Screen name="(camera)" options={{
      headerShown: false,
      
    }} />
    <Stack.Screen name="(add)" options={{
      headerShown: false,
      
    }} />
    <Stack.Screen name="(newSnack)" options={{
      headerShown: false,
      
    }} />
    <Stack.Screen name="(login)" options={{
      headerShown: false,
      
    }} />
    <Stack.Screen name="(account)" options={{
      headerShown: false,
      
    }} />
    <Stack.Screen name="(snackAdd)" options={{
      headerShown: false,
      
    }} />
  </Stack>;
}

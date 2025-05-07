import React from 'react'
import { Link, useFocusEffect } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, Button, Pressable, Modal, ScrollView } from "react-native";
import { useCameraPermissions } from "expo-camera"
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Route } from "expo-router/build/Route";

const NotFoundModal = ({ nFoundVis, setNFoundVis, setItem, _clearCodeTemp }: any) => {

  const navigation: any = useNavigation()

  return (
    <>
        <Modal visible={nFoundVis}>
          <View style={{ 
            display: 'flex',
            justifyContent: 'center',
           }}>
            <View style={{ 
              marginTop: "50%",
              marginInline: "auto",
              width: "80%"
             }}>
              <Text style={{ textAlign: 'center', fontSize: 25 }}>Item no found :(</Text>
              <Text style={{ textAlign: 'center', fontSize: 18 }}>would you like to add this product and help others?</Text>
              <View style={{ 
                width: "100%",
                height: 40,
               }}>
                <Button title='ADD' onPress={() => {
                  setNFoundVis(false)
                  setItem(undefined)
                  navigation.navigate("(add)")
                }} />
              </View>
              <View style={{ 
                width: "100%",
                height: 40,
               }}>
                <Button title='Back' onPress={() => {
                  setNFoundVis(false)
                  setItem(undefined)
                  _clearCodeTemp()
                }} />
              </View>
            </View>
          </View>    
        </Modal>
    </>
  )
}

export default NotFoundModal
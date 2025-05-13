import { Link, useFocusEffect } from "expo-router";
import React, { useLayoutEffect } from "react";
import { useEffect, useState, useCallback } from "react";
import { Text, View, Button, Pressable, Modal, ScrollView, TouchableOpacity } from "react-native";
import { useCameraPermissions } from "expo-camera"
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Route } from "expo-router/build/Route";
import Icon from "react-native-vector-icons/Feather";
import IfLogged from "./components/ifLogged";
import NotLogged from "./components/notLogged";
import FoundModal from "./components/modals/FoundModal";
import NotFoundModal from "./components/modals/NotFoundModal";
import AddSnackModal from "./components/modals/AddSnackModal";
import { useIsFocused } from "@react-navigation/native";
import url from "../config/url";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {


  const navigation: any = useNavigation()
  const insets = useSafeAreaInsets()

  const [foundVis, setFoundVis] = useState(false)
  const [nFoundVis, setNFoundVis] = useState(false)
  const [snackVis, setSnackVis] = useState(false)
  const [savedCodes, setSavedCodes] = useState<Array<{id: number, code: string}>>()
  const [item, setItem] = useState<{id_i: number, itemName: string, barcode: string, description: string, energyValue: number, fat: number, ofWhichSaturates: number, carbohydrates: number, ofWhichSugars: number, protein: number, salt: number, fiber: number, mass: number}>()
  const [loggedUser, setLoggedUser] = useState<{id_u: number, username: string, logged: boolean}>()
  const [logged, setLogged] = useState(false)

  

  const [code, setCode] = useState("")

  const [permission, requestPermission] = useCameraPermissions();

  const isFocused = useIsFocused()

  const isPermissinGranted = Boolean(permission?.granted)

  
  useFocusEffect(
    useCallback(() =>{
      _retriveLoggedUser();
      _retriveCodeTemp();
      getItems();
    }, [])
  )

  

  
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
  const _retriveLoggedUser = async () =>{
    try{
      const user = await AsyncStorage.getItem('user')
      const loged = await AsyncStorage.getItem('loged')
      if(user != null){
        const usr = await JSON.parse(user)  
        setLoggedUser(usr)
      }
       if(loged != null){
        const log = await JSON.parse(loged)  
        setLogged(log)
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

  

  const getItems = async () =>{
    try{
      const code = await AsyncStorage.getItem('codeTemp')
      console.log(code);
      
      if(code !== null){
        const response = await fetch(`${url}/api/Items/GetByBarcode/${code}`)
      
        if(!response.ok){
          console.error("something went wrong")
        }

        const data = await response.json()

        setItem(data)
        setFoundVis(true)
      }
      
    }catch (error){
      setNFoundVis(true)
    }
    
  }

  return (
    isFocused ? <>

      {/* <Button title="check1" onPress={() => {setFoundVis(!foundVis)}} />
      <Button title="check2" onPress={() => {setNFoundVis(!nFoundVis)}} />
      <Button title="check3" onPress={() => {setSnackVis(!snackVis)}} /> */}


      {(logged == true) ? <IfLogged loggedUser={loggedUser} setSnackVis={setSnackVis} /> : <NotLogged />}

        
      <FoundModal foundVis={foundVis} setFoundVis={setFoundVis} item={item} setItem={setItem} _clearCodeTemp={_clearCodeTemp} loggedUser={loggedUser} />

      <NotFoundModal nFoundVis={nFoundVis} setNFoundVis={setNFoundVis} setItem={setItem} _clearCodeTemp={_clearCodeTemp}  />

      <AddSnackModal snackVis={snackVis} setSnackVis={setSnackVis} />

      <View style={{ 
        display: "flex",
        position: "absolute",
        top: "85%",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "20%",
        borderTopWidth: 1,
        borderStyle: "solid",
        paddingBottom: insets.bottom
      }}>
        <View>
            <View>
              <TouchableOpacity style={{ 
                width: 86,
                height: 86,
                backgroundColor: "rgba(33, 150, 243, 1.00)",
                alignItems: "center",
                borderRadius: 43,
               }} onPress={() =>{
                console.log(isPermissinGranted)
                  if(!isPermissinGranted){
                    requestPermission()
                  }else{
                    navigation.replace("(camera)")
                  }
               }}>
                <View style={{ 
                  marginTop: "20%"
                 }}>
                  {(!isPermissinGranted) ? <Icon name="camera-off" size={50} color="white" /> : <Icon name="camera" size={50} color="white" />}
                </View>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    </> : null
    
  );
}
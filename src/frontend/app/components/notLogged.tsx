import { Link, useFocusEffect } from "expo-router";
import React from "react";
import { useEffect, useState } from "react";
import { Text, View, Button, Pressable, Modal, ScrollView } from "react-native";
import { useCameraPermissions } from "expo-camera"
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Route } from "expo-router/build/Route";


function NotLogged() {
    
  return (
        <View style={{ 
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          height: "85%"
         }}>
            <Text style={{ 
              textAlign: "center", fontSize: 25, textTransform: "uppercase"
             }}>Log on to see your snacks</Text>
        </View>
  )
}

export default NotLogged
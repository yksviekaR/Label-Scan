import { Link, useFocusEffect } from "expo-router";
import React from "react";
import { useEffect, useState } from "react";
import { Text, View, Button, Pressable, Modal, ScrollView } from "react-native";
import { useCameraPermissions } from "expo-camera"
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Route } from "expo-router/build/Route";
import { useRoute } from "@react-navigation/native";

const Empty = () => {
  return (
    <View>
        <Text style={{ margin: "auto", textAlign: "center" }}>It seems you dont have any snacks saved</Text>
    </View>
  )
}

export default Empty
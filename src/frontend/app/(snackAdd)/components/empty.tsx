import React from "react";
import { Text, View, Button } from "react-native";
import { useNavigation } from "expo-router";

const Empty = () => {

  const navigation: any = useNavigation()

  return (
    <View style={{ 
      margin: "auto"
     }}>
        <Text style={{ margin: "auto", textAlign: "center", textTransform: "uppercase" }}>It seems you dont have any snacks saved</Text>
        <View style={{ 
          marginInline: "auto",
          width: "40%"
         }}>
          <Button title="Go back" onPress={() =>{
            navigation.replace("index")
          }} />
        </View>
    </View>
  )
}

export default Empty
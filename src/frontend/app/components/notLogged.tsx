import React from "react";
import { Text, View } from "react-native";



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
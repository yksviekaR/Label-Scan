import React from "react";
import { Text, View, Button } from "react-native";



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
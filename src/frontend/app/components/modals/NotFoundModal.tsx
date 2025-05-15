import React from 'react'
import { Text, View, Button, Modal } from "react-native";
import { useNavigation } from "expo-router";

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
              <Text style={{ textAlign: 'center', fontSize: 25, textTransform: "uppercase" }}>Item no found :(</Text>
              <Text style={{ textAlign: 'center', fontSize: 18, textTransform: "uppercase" }}>would you like to add this product and help others?</Text>
              <View style={{ 
                width: "100%",
                height: 40,
               }}>
                <Button title='ADD' onPress={() => {
                  setNFoundVis(false)
                  setItem(undefined)
                  navigation.replace("(add)")
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
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from "react-native-vector-icons/FontAwesome"


function Title({navigation}: {navigation: any}) {
  return (
    <View style={{ flexDirection: "row", alignItems: "stretch", justifyContent: "space-between" }}>
      <Text style={{ fontSize: 40, fontWeight: "500" }}>Label Scan</Text>
      <TouchableOpacity style={{ 
        }} onPressIn={async () => {
          try{
            const value = await AsyncStorage.getItem('loged')
            if(value !== null){
              if(value == "true"){
                navigation.navigate('(account)')
              }else{
                navigation.navigate('(auth)')
              }
            }else{
              navigation.navigate('(auth)')
            }
          }
          catch (error){
            alert("something went wrong")
          }
        }}>
          <Icon name="user-o" size={50}/>
        </TouchableOpacity>
    </View>
  );
}

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="index" options={ ({ navigation }) => ({
      headerTitle: () => <Title navigation={navigation} />,
      headerBackVisible: false,
      headerLeft: () =>{
        return null
      }
    })}>
    </Stack.Screen>
    
    <Stack.Screen name="(camera)" options={{
      headerShown: false,
      
    }} />
    <Stack.Screen name="(add)" options={{
      headerShown: false,
      
    }} />
    <Stack.Screen name="(newSnack)" options={{
      headerShown: false,
      
    }} />
    <Stack.Screen name="(auth)" options={{
      headerShown: false,
      
    }} />
    <Stack.Screen name="(account)" options={{
      headerShown: false,
      
    }} />
    <Stack.Screen name="(snackAdd)" options={{
      headerShown: false,
      
    }} />
    <Stack.Screen name="(details)" options={{
      headerShown: false,
      
    }} />
  </Stack>;
}
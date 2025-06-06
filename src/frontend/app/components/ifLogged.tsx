import { useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import { useState } from "react";
import Empty from './empty'
import Populated from './populated'
import url from "../../config/url";



function IfLogged({ loggedUser, setSnackVis }: any) {


    const [snacks, setSnacks] = useState<Array<{id_s: number, id_u: number, snackName: string, energyValue: number, fat: number, ofWhichSaturates: number, carbohydrates: number, ofWhichSugars: number, protein: number, salt: number, fiber: number, mass: number, ingredients: string}>>()
    
    

    const [anySnacks, setAnySnacks] = useState(false)

    useFocusEffect(
      useCallback(() =>{
        getSnacks();
      }, [])
    )


    const getSnacks = async () =>{      
        try{
          const response = await fetch(`${url}/api/UserSnacksControler/GetSnackOfUser/${loggedUser.id_u}`)
          
          if(!response.ok){
            console.error("something went wrong")
          }

          const data = await response.json()


          if(Array.isArray(data) && data.length != 0){
            setAnySnacks(true)
            setSnacks(data)

          }else{
            setAnySnacks(false)

          }
        }catch (error){
          console.error('Error: ', error)
        }
        
    }

    
  return (
    <>
        {(anySnacks == true) ? <Populated snacks={snacks} setSnacks={setSnacks} setSnackVis={setSnackVis} /> : <Empty setSnackVis={setSnackVis} />}
    </>
  )
}

export default IfLogged
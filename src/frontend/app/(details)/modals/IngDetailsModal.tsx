import React from 'react'
import { Modal, View, Text, Button } from 'react-native'

const IngDetailsModal = ({ detailsVis, setDetailsVis, item, setItem }: any) => {


  return (
    <>
        <Modal visible={detailsVis}>
                  <View style={{ 
                    display: 'flex',
                    width: "80%",
                    justifyContent: 'center',
                    flexDirection: "column",
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: "60%"
                    }}>
                    <Text style={{ textAlign: 'center', fontSize: 25 }}>Item name: {`\n`} {item?.itemName}</Text>
                    <Text style={{ textAlign: 'center', fontSize: 20 }}>Barcode: {`\n`} {item?.barcode}</Text>
                    <Text style={{ textAlign: 'center' }}>{item?.description}</Text>
                    <View style={{ 
                        marginTop: 20,
                        marginBottom: 20,
                        display: "flex",
                        justifyContent: 'space-between',
                        flexDirection: "row"
                        }}>
                        <View style={{
                        display: "flex",
                        justifyContent: 'center',
                        flexDirection: "column",
                        flex: 50,
                        width: "50%"
                        }}>
                        <Text style={{ textAlign: 'center' }}>Energy value: {item?.energyValue}</Text>
                        <Text style={{ textAlign: 'center' }}>Fat: {item?.fat}</Text>
                        <Text style={{ textAlign: 'center' }}>Of Which Saturates: {item?.ofWhichSaturates}</Text>
                        <Text style={{ textAlign: 'center' }}>Protein: {item?.protein}</Text>
                        </View>
                        <View style={{
                        display: "flex",
                        justifyContent: 'center',
                        flexDirection: "column",
                        flex: 50,
                        width: "50%"
                        }}>
                        <Text style={{ textAlign: 'center' }}>Salt: {item?.salt}</Text>
                        <Text style={{ textAlign: 'center' }}>Carbohydrates: {item?.carbohydrates}</Text>
                        <Text style={{ textAlign: 'center' }}>of which sugars: {item?.ofWhichSugars}</Text>
                        <Text style={{ textAlign: 'center' }}>Fiber: {item?.fiber}</Text>
                        </View>
                    </View>
                    </View>
                    <View style={{ 
                      width: "80%",
                      marginInline: "auto",
                      height: 50,
                     }}>
                      <Button title='BACK' onPress={() => {
                        setDetailsVis(false)
                        setItem(undefined)
                      }} />
                    </View> 
                </Modal>
    </>
  )
}

export default IngDetailsModal
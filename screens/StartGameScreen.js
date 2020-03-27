import React, { useState } from 'react'
import { View, StyleSheet, Text, Button, TouchableWithoutFeedback, Keyboard, Alert, Modal } from 'react-native'
import Card from '../components/Card'
import Colors from '../constants/Colors'
import Input from '../components/Input'
import ConfirmGameCard from '../components/ConfirmGameCard'

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('')

    const [confirmed, setConfirmed] = useState(false)

    const [selectedNum, setSelectedNum] = useState('')

    const [modalVis, setModalVis] = useState(false) 

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    }

    const handleResetPress = () => {
        setEnteredValue('')
        setConfirmed(false)
    }

    const handleConfirmPress = () => {
        const chosenNumber = parseInt(enteredValue)
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
            
            Alert.alert(
                'Oops! Something isn\'t right...',
                'Your number must be between 1 and 99.',
                [{text: 'Okay', style: 'destructive', onPress: handleResetPress}]
            )
            return
        } else {
            setConfirmed(true)
            setSelectedNum(chosenNumber)
            setEnteredValue('')
            dismissKeyboard()
            toggleModal()
        }
    }

    const handleCancelStart = () => {
        setConfirmed(false)
        toggleModal()
    }

    const dismissKeyboard = () => {
        Keyboard.dismiss()
    }

    const toggleModal = () => {
        setModalVis(!modalVis)
    }

    let confirmedOutput

    if (confirmed){
        confirmedOutput = <Text>Your Number is {selectedNum}</Text> 
    }

    return(
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a New Game!</Text>
                <Card style={styles.inputContainer}>
                    <Text>Select a Number</Text>
                    <Input
                        style={styles.input}
                        blurOnSubmit
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType='numeric'
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button
                                color={Colors.accent}
                                title="Reset"
                                onPress={handleResetPress}
                            />
                        </View>
                        <View style={styles.button}>
                            <Button
                                color={Colors.primary}
                                title="Confirm"
                                onPress={handleConfirmPress}    
                            />
                        </View>
                    </View>
                </Card>
                <Modal visible={modalVis} animationType="slide">
                    <ConfirmGameCard
                        selectedNum={selectedNum}
                        handleOnCancelStart={handleCancelStart}
                        handleOnConfirmStart={props.onStartGame}
                    />
                </Modal>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        justifyContent: 'flex-start'
    },
    title:{
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'

    }, 
    inputContainer: {
        marginTop: 20,
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: 10
    },
    button: {
        width: '40%'

    },
    input: {
        width: '20%',
        fontSize: 30,
        textAlign: 'center'
    }
})

export default StartGameScreen
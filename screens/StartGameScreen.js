import React, { useState } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert, Modal, Dimensions } from 'react-native'
import Card from '../components/Card'
import Colors from '../constants/Colors'
import Input from '../components/Input'
import ConfirmGameCard from '../components/ConfirmGameCard'
import TitleText from '../components/TitleText'
import BodyText from '../components/BodyText'
import ButtonContainer from '../components/ButtonContainer'
import MainButton from '../components/MainButton'

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
        confirmedOutput = <BodyText>Your Number is {selectedNum}</BodyText> 
    }

    return(
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.screen}>
                <TitleText>Start a New Game!</TitleText>
                <Card style={styles.inputContainer}>
                    <BodyText>Select a Number</BodyText>
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
                    <ButtonContainer>
                        <MainButton style={{backgroundColor: Colors.accent}} handleOnPress={handleResetPress}>
                            Reset
                        </MainButton>
                        <MainButton style={{backgroundColor: Colors.primary}} handleOnPress={handleConfirmPress}>
                            Confirm
                        </MainButton>
                    </ButtonContainer>
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
    inputContainer: {
        marginTop: 20,
        width: '80%',
        maxWidth: '90%',
        minWidth: 300,
        alignItems: 'center'
    },
    input: {
        width: '20%',
        fontSize: 30,
        textAlign: 'center'
    }
})

export default StartGameScreen
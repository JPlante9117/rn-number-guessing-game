import React, { useState, useRef } from 'react'

import { View, StyleSheet, Alert, ScrollView, FlatList } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import Card from '../components/Card'
import NumberDisplay from '../components/NumberDisplay'
import BodyText from '../components/BodyText'
import ButtonContainer from '../components/ButtonContainer'
import Colors from '../constants/Colors'
import MainButton from '../components/MainButton'

const generateRandomBetween = (min, max, exclude = 0) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const random = Math.floor(Math.random() * (max-min)) + min
    if (random === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return random
    }
}

const GameScreen = props => {

    const [pastGuesses, setPastGuesses] = useState([])
    const bottomRange = useRef(1)
    const topRange = useRef(100)

    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(bottomRange.current, topRange.current, props.userChoice))

    const handleLowerPress = () => {
        if (currentGuess > props.userNumber){
            topRange.current = currentGuess
            setPastGuesses(curPastGuesses => [currentGuess, ...curPastGuesses])
            setCurrentGuess(generateRandomBetween(bottomRange.current, topRange.current))
        } else {
            Alert.alert('Don\'t lie!', 'Make sure you\'re honest here...', [{text: 'Sorry!', style: 'cancel'}])
        }
    }

    const handleHigherPress = () => {
        if (currentGuess < props.userNumber){
            bottomRange.current = currentGuess + 1
            setPastGuesses(curPastGuesses => [currentGuess, ...curPastGuesses])
            setCurrentGuess(generateRandomBetween(bottomRange.current, topRange.current))
        } else {
            Alert.alert('Don\'t lie!', 'Make sure you\'re honest here...', [{text: 'Sorry!', style: 'cancel'}])
        }
    }

    const handleCorrectPress = () => {
        setPastGuesses(curPastGuesses => [currentGuess, ...curPastGuesses])
        props.onGameOver(pastGuesses)
    }

    const resetGame = () => {
        props.reset()
    }

    let buttonChoices

    if (currentGuess === props.userNumber) {
        buttonChoices = (
            <ButtonContainer style={{justifyContent: 'center'}}>
                <View style={styles.button}>
                    <MainButton style={{backgroundColor: 'transparent'}} handleOnPress={handleCorrectPress} >
                        <AntDesign name="checkcircleo" color={Colors.confirmation} size={50} />
                    </MainButton>
                </View>
            </ButtonContainer>
            )
    } else {
        buttonChoices = (
        <ButtonContainer>
            <MainButton style={{backgroundColor: 'transparent'}} handleOnPress={handleLowerPress} >
                <AntDesign name="minuscircleo" size={50} color={Colors.cool} />
            </MainButton>
            <MainButton style={{backgroundColor: 'transparent'}} handleOnPress={handleHigherPress} >
                <AntDesign name="pluscircleo" size={50} color={Colors.primary} />
            </MainButton>
        </ButtonContainer>
        )
    }

    return (
        <View style={styles.screen}>
            <Card style={styles.guessContainer}>
                <BodyText>Is your number</BodyText>
                <NumberDisplay>{currentGuess}</NumberDisplay>
                {buttonChoices}
            </Card>
            <ButtonContainer style={{justifyContent: 'center'}}>
                <MainButton style={{backgroundColor: Colors.grayscale}} handleOnPress={resetGame}>
                    RESET
                </MainButton>
            </ButtonContainer>
            <View style={styles.listContainer}>
                <BodyText>Past Guesses</BodyText>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map(guess => <View style={styles.listItem}><NumberDisplay style={{fontSize: 60}}>{guess}</NumberDisplay></View>)}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    guessContainer: {
        marginTop: 20,
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },
    listContainer: {
        flex: 1,
        width: '80%'
    },
    list: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    listItem: {
        marginVertical: 10
    }


})

export default GameScreen
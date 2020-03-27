import React, { useState, useRef } from 'react'

import { View, StyleSheet, Text, Button, Alert } from 'react-native'
import Card from '../components/Card'
import NumberDisplay from '../components/NumberDisplay'
import BodyText from '../components/BodyText'
import ButtonContainer from '../components/ButtonContainer'
import Colors from '../constants/Colors'

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

    const [guessCount, setGuessCount] = useState(1)
    const bottomRange = useRef(1)
    const topRange = useRef(100)

    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(bottomRange.current, topRange.current, props.userChoice))

    const handleLowerPress = () => {
        if (currentGuess > props.userNumber){
            topRange.current = currentGuess
            setGuessCount(guessCount + 1)
            setCurrentGuess(generateRandomBetween(bottomRange.current, topRange.current))
        } else {
            Alert.alert('Don\'t lie!', 'Make sure you\'re honest here...', [{text: 'Sorry!', style: 'cancel'}])
        }
    }

    const handleHigherPress = () => {
        if (currentGuess < props.userNumber){
            bottomRange.current = currentGuess + 1
            setGuessCount(guessCount + 1)
            setCurrentGuess(generateRandomBetween(bottomRange.current, topRange.current))
        } else {
            Alert.alert('Don\'t lie!', 'Make sure you\'re honest here...', [{text: 'Sorry!', style: 'cancel'}])
        }
    }

    const tempClear = () => {
        props.temp()
    }

    let buttonChoices

    if (currentGuess === props.userNumber) {
        buttonChoices = (
            <ButtonContainer>
                <View style={styles.button}>
                    <Button
                        color="green"
                        title="Correct!"
                        onPress={() => props.onGameOver(guessCount)}
                    />
                </View>
            </ButtonContainer>
            )
    } else {
        buttonChoices = (
        <ButtonContainer>
            <View style={styles.button}>
                <Button
                    color={Colors.accent}
                    title="LOWER"
                    onPress={handleLowerPress}
                />
            </View>
            <View style={styles.button}>
                <Button
                    color={Colors.primary}
                    title="HIGHER"
                    onPress={handleHigherPress}
                />
            </View>
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
                <Button
                    color="gray"
                    onPress={tempClear}
                    title="reset"
                />
            </ButtonContainer>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    button: {
        width: "40%"
    },
    guessContainer: {
        marginTop: 20,
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    }
})

export default GameScreen
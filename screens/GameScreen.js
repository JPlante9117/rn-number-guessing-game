import React, { useState, useRef } from 'react'

import { View, StyleSheet, Text, Button, Alert } from 'react-native'
import Card from '../components/Card'
import NumberDisplay from '../components/NumberDisplay'

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
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(bottomRange, topRange, props.userChoice))

    const guessCount = useRef(0)
    const bottomRange = useRef(1)
    const topRange = useRef(100)

    const handleLowerPress = () => {
        if (currentGuess > props.userNumber){
            topRange.current = currentGuess
            guessCount.current += 1
            setCurrentGuess(generateRandomBetween(bottomRange, topRange))
        } else {
            Alert.alert('Don\'t lie!', 'Make sure you\'re honest here...', [{text: 'Sorry!', style: 'cancel'}])
        }
    }

    const handleHigherPress = () => {
        if (currentGuess < props.userNumber){
            bottomRange.current = currentGuess + 1
            guessCount.current += 1
            setCurrentGuess(generateRandomBetween(bottomRange, topRange))
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
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button
                        title="Correct!"
                        onPress={() => {}}
                    />
                </View>
            </View>
            )
    } else {
        buttonChoices = (
        <View style={styles.buttonContainer}>
            <View style={styles.button}>
                <Button
                    title="LOWER"
                    onPress={handleLowerPress}
                />
            </View>
            <View style={styles.button}>
                <Button
                    title="HIGHER"
                    onPress={handleHigherPress}
                />
            </View>
        </View>
        )
    }

    return (
        <View style={styles.screen}>
            <Card style={styles.guessContainer}>
                <Text>Is your number</Text>
                <NumberDisplay>{currentGuess}</NumberDisplay>
                {buttonChoices}
            </Card>
            <Text>{guessCount}</Text>
            <Button
                onPress={tempClear}
                title="reset"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: '100%'
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
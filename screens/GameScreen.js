import React, { useState } from 'react'

import { View, StyleSheet, Text, Button } from 'react-native'
import Card from '../components/Card'

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
    const [bottomRange, setBottomRange] = useState(1)
    const [topRange, setTopRange] = useState(100)
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(bottomRange, topRange, props.userChoice))

    const [guessCount, setGuessCount] = useState(0)

    return (
        <View style={styles.screen}>
            <Card style={styles.guessContainer}>
                <Text>Is your number</Text>
                <Text>{currentGuess}</Text>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button
                            title="LOWER"
                            onPress={() => {}}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            title="HIGHER"
                            onPress={() => {}}
                        />
                    </View>
                </View>
            </Card>
            <Text>{guessCount}</Text>
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
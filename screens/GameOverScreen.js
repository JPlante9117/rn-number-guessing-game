import React from 'react'

import { StyleSheet, View, Text, Button } from 'react-native'
import Colors from '../constants/Colors'
import Card from '../components/Card'
import NumberDisplay from '../components/NumberDisplay'

const GameOverScreen = props => {
    return(
        <View style={styles.screen}>
            <Text style={styles.headerMessage}>Yes, I did it!</Text>
            <Card style={styles.messageContainer}>
                <Text>Your number is</Text>
                <NumberDisplay>{props.userNumber}</NumberDisplay>
            </Card>
            <Card style={styles.messageContainer}>
                <Text>It took</Text><NumberDisplay style={styles.guessCount}>{props.roundCount}</NumberDisplay><Text>guesses to get there!</Text>
            </Card>
            <View style={styles.buttonContainer}>
                <Button 
                    color={Colors.primary}
                    title="Play Again"
                    onPress={props.resetGame}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    messageContainer: {
        marginTop: 20,
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },
    headerMessage: {
        fontSize: 45,
        fontWeight: "bold",
        color: Colors.primary
    },
    guessCount: {
        fontSize: 70,
        color: Colors.accent
    },
    buttonContainer: {
        padding: 10
    }
})

export default GameOverScreen
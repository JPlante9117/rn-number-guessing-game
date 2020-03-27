import React from 'react'

import { StyleSheet, View, Text, Button } from 'react-native'
import Colors from '../constants/Colors'
import Card from '../components/Card'

const GameOverScreen = props => {
    return(
        <View style={styles.screen}>
            <Text style={styles.headerMessage}>Yes, I did it!</Text>
            <Card style={styles.messageContainer}>
                    <Text>Your number is {props.userNumber}!</Text>
                    <Text>It took {props.roundCount} guesses to get there, but I finally did!</Text>
                    <Button 
                        color={Colors.primary}
                        title="Play Again"
                        onPress={props.resetGame}
                    />
            </Card>
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
        fontWeight: "bold"
    }
})

export default GameOverScreen
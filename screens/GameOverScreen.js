import React from 'react'

import { StyleSheet, View, Button } from 'react-native'
import Colors from '../constants/Colors'
import Card from '../components/Card'
import NumberDisplay from '../components/NumberDisplay'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'

const GameOverScreen = props => {
    return(
        <View style={styles.screen}>
            <TitleText style={{marginVertical: 0, color: Colors.primary}}>Yes, I did it!</TitleText>
            <Card style={styles.messageContainer}>
                <BodyText>Your number is</BodyText>
                <NumberDisplay>{props.userNumber}</NumberDisplay>
            </Card>
            <Card style={styles.messageContainer}>
                <BodyText>It took</BodyText><NumberDisplay style={styles.guessCount}>{props.roundCount}</NumberDisplay><BodyText>guesses to get there!</BodyText>
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
    guessCount: {
        fontSize: 70,
        color: Colors.accent
    },
    buttonContainer: {
        padding: 10
    }
})

export default GameOverScreen
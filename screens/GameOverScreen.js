import React from 'react'

import { StyleSheet, View, Button, Image, ScrollView } from 'react-native'
import Colors from '../constants/Colors'
import Card from '../components/Card'
import NumberDisplay from '../components/NumberDisplay'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'

import ViewPager from '@react-native-community/viewpager'

const GameOverScreen = props => {
    return(
        <ViewPager style={styles.screen}>
            <View key="1" style={styles.insetScreen}>
                    <TitleText style={{marginVertical: 0, color: Colors.primary}}>Yes, I did it!</TitleText>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={require('../assets/success.png')} resizeMode="cover" />
                    </View>
                    <BodyText>Swipe right for details</BodyText>
                    <View style={styles.buttonContainer}>
                        <Button 
                            color={Colors.primary}
                            title="Play Again"
                            onPress={props.resetGame}
                        />
                    </View>
            </View>
            <View key="2" style={styles.insetScreen}>
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
        </ViewPager>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    insetScreen: {
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
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow:'hidden',
        marginVertical: 10
    }

})

export default GameOverScreen
import React from 'react'

import { StyleSheet, View, Image, ScrollView } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import Card from '../components/Card'
import NumberDisplay from '../components/NumberDisplay'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'

import ViewPager from '@react-native-community/viewpager'
import MainButton from '../components/MainButton'

const GameOverScreen = props => {
    return(
        <ViewPager style={styles.screen}>
            <View key="1" style={styles.insetScreen}>
                    <TitleText style={{marginVertical: 0, color: Colors.primary}}>Hooray!</TitleText>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={require('../assets/success.png')}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={styles.detailsContainer}>
                        <BodyText style={styles.detailsText}>Swipe Right for Details</BodyText>
                        <AntDesign name="doubleright" size={40} color={Colors.cool} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <MainButton style={{backgroundColor: Colors.primary, width: "100%"}} handleOnPress={props.resetGame}>
                            Play Again
                        </MainButton>
                    </View>
            </View>
            <View key="2" style={styles.insetScreen}>
                    <Card style={styles.messageContainer}>
                        <BodyText>Your number was</BodyText>
                        <NumberDisplay>{props.userNumber}</NumberDisplay>
                    </Card>
                    <Card style={styles.messageContainer}>
                        <BodyText>It took</BodyText><NumberDisplay>{props.guesses.length + 1}</NumberDisplay><BodyText>guesses to get there!</BodyText>
                    </Card>
                    <View style={{...styles.detailsContainer, justifyContent: 'space-between'}}>
                        <View style={{margin: 10}}>
                            <AntDesign name="doubleleft" size={40} color={Colors.cool} />
                        </View>
                        <View style={{margin: 10}}>
                            <AntDesign name="doubleright" size={40} color={Colors.cool} />
                        </View>
                    </View>
            </View>
            <View key="3" style={styles.insetScreen}>
                <TitleText>Guesses:</TitleText>
                <ScrollView style={{width: '100%'}}>
                    {props.guesses.reverse().map((guess, idx) => <View key={idx + 1}><NumberDisplay style={{fontSize: 60}}>{guess}</NumberDisplay></View>)}
                    <View><NumberDisplay style={{fontSize: 60, color: Colors.primary}}>{props.userNumber}</NumberDisplay></View>
                </ScrollView>
                <View style={styles.detailsContainer}>
                    <AntDesign name="doubleleft" size={40} color={Colors.cool} />
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
        padding: 10,
        width: '100%'
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
        padding: 10,
        width: '100%'
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
        borderColor: Colors.cool,
        overflow:'hidden',
        marginVertical: 10
    },
    detailsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 75,
        flexDirection: "row",
        width: '80%'
    },
    detailsText: {
        height: '100%',
        textAlignVertical: 'center',
        marginRight: 5
    }

})

export default GameOverScreen
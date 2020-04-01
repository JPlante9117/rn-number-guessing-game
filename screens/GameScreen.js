import React, { useState, useRef, useEffect } from 'react'

import { View, StyleSheet, Alert, ScrollView, FlatList, Dimensions } from 'react-native'
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
    const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width)
    const [deviceHeight, setDeviceHeight] = useState(Dimensions.get('window').height)

    useEffect(() => {
        const updateLayout = () => {
            setDeviceHeight(Dimensions.get('window').height)
            setDeviceWidth(Dimensions.get('window').width)
        }
        Dimensions.addEventListener('change', updateLayout)
        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    })


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

    let guessFontSize = styles.guessFontBig

    if (deviceWidth < 350){
        guessFontSize = styles.guessFontSmall
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

    if (deviceHeight < 500) {
        if (currentGuess === props.userNumber) {
            buttonChoices = (
                    <ButtonContainer style={{justifyContent: 'center', flexDirection: 'column'}}>
                        <NumberDisplay style={{fontSize: 60}}>{currentGuess}</NumberDisplay>
                        <MainButton style={{backgroundColor: 'transparent'}} handleOnPress={handleCorrectPress} >
                            <AntDesign name="checkcircleo" color={Colors.confirmation} size={30} />
                        </MainButton>
                    </ButtonContainer>
                )
        } else {
            buttonChoices = (
                <ButtonContainer>
                    <MainButton style={{backgroundColor: 'transparent'}} handleOnPress={handleLowerPress} >
                        <AntDesign name="minuscircleo" size={30} color={Colors.cool} />
                    </MainButton>
                    <NumberDisplay style={{fontSize: 60}}>{currentGuess}</NumberDisplay>
                    <MainButton style={{backgroundColor: 'transparent'}} handleOnPress={handleHigherPress} >
                        <AntDesign name="pluscircleo" size={30} color={Colors.primary} />
                    </MainButton>
                </ButtonContainer>
            )
        }
        return (
            <ScrollView>
                <View style={styles.screen}>
                    <BodyText>Is Your Number</BodyText>
                    {buttonChoices}
                <ButtonContainer style={{justifyContent: 'center'}}>
                    <MainButton style={{backgroundColor: Colors.grayscale}} handleOnPress={resetGame}>
                        RESET
                    </MainButton>
                </ButtonContainer>
                <View style={styles.listContainer}>
                    <BodyText>Past Guesses</BodyText>
                        {pastGuesses.map(guess => <View style={styles.listItem} key={guess}><NumberDisplay style={guessFontSize}>{guess}</NumberDisplay></View>)}
                </View>
            </View>
            </ScrollView>
        )
    } else {
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
                        {pastGuesses.map(guess => <View style={styles.listItem} key={guess}><NumberDisplay style={guessFontSize}>{guess}</NumberDisplay></View>)}
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    guessContainer: {
        marginTop: Dimensions.get('window').height > 600 ? 15 : 0,
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },
    listContainer: {
        flex: 1,
        width: Dimensions.get('window').width > 350 ? '60%' : '80%'
    },
    list: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    listItem: {
        marginVertical: Dimensions.get('window').height > 600 ? 5 : 0
    },
    guessFontBig: {
        fontSize: 50
    },
    guessFontSmall: {
        fontSize: 30
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        alignItems: 'center'
    }


})

export default GameScreen
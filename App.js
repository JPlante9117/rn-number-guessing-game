import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import * as Font from 'expo-font'
import { AppLoading } from 'expo'


const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}


export default function App() {

  const [userNumber, setUserNumber] = useState()
  const [guessRounds, setGuessRounds] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)

  if (!dataLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} />
  }

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber)
    setGuessRounds([])
  }

  const gameOverHandler = pastGuesses => {
    setGuessRounds(pastGuesses)
  }

  const resetGame = () => {
    setUserNumber()
    setGuessRounds([])
  }

  let currentScreen = <StartGameScreen onStartGame={startGameHandler} />

  if (userNumber && guessRounds.length <= 0) {
    currentScreen = <GameScreen reset={resetGame} userNumber={userNumber} onGameOver={gameOverHandler} />
  } else if (guessRounds.length > 0) {
    currentScreen = <GameOverScreen userNumber={userNumber} guesses={guessRounds} resetGame={resetGame} />
  }

  return (
    <SafeAreaView style={styles.screen}>
        <Header title={"Guess a Number"} />
        {currentScreen}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

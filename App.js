import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
  const [guessRounds, setGuessRounds] = useState(0)
  const [dataLoaded, setDataLoaded] = useState(false)

  if (!dataLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} />
  }

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber)
    setGuessRounds(0)
  }

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds)
  }

  const resetGame = () => {
    setUserNumber()
    setGuessRounds(0)
  }

  let currentScreen = <StartGameScreen onStartGame={startGameHandler} />

  if (userNumber && guessRounds <= 0) {
    currentScreen = <GameScreen reset={resetGame} userNumber={userNumber} onGameOver={gameOverHandler} />
  } else if (guessRounds > 0) {
    currentScreen = <GameOverScreen userNumber={userNumber} roundCount={guessRounds} resetGame={resetGame} />
  }

  return (
    <View style={styles.screen}>
      <Header title={"Guess a Number"} />
      {currentScreen}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

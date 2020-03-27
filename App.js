import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {

  const [userNumber, setUserNumber] = useState()
  const [guessRounds, setGuessRounds] = useState(0)

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

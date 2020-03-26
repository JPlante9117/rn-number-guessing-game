import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';

export default function App() {

  const [userNumber, setUserNumber] = useState()

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber)
  }

  const clearNum = () => {
    setUserNumber()
  }

  let currentScreen = <StartGameScreen onStartGame={startGameHandler} />

  if (userNumber) {
    currentScreen = <GameScreen temp={clearNum} userNumber={userNumber} />
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

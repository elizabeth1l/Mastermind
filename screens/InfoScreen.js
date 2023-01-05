import react from 'react';

import { StyleSheet, Text, View } from "react-native";

const InfoScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Mastermind</Text>
      <View style={styles.instructionsContainer}>
        <View style={styles.promptContainer}>
          <Text style={styles.question}>What is Mastermind?</Text>
          <Text style={styles.answer}>
              This is a game where a player tries to guess the number combination created by the computer. At the end of each attempt at guessing the 4 number combination, the computer will provide feedback whether the player had guessed a number correctly, or/and the location of a number correctly. The player must guess the right number combinations within 10 attempts to win the game.
          </Text>
        </View>
 

       
      </View>
    </View>
  );
};

export default InfoScreen;
const styles = StyleSheet.create({
  container: {
    marginTop: 90,
    paddingHorizontal: 20,
    alignSelf: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#6EB0AE",
  },
  instructionsContainer: {
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
  },
  promptContainer: {
    paddingVertical: 15,
  },
  question: {
    paddingBottom: 10,
    fontStyle: "italic",
    fontSize: 18,
    color: "gray",
  },
  answer: {
    fontSize: 13,
  },
});
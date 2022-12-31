import { get } from "firebase/database";
import react, { useState, useEffect } from "react";
import { Text, View, TextInput, StyleSheet, Button } from "react-native";

const GameScreen = () => {
  let [row, setRow] = useState(1);
  let [guesses, setGuesses] = useState("");
  const [firstNumber, setFirstNumber] = useState();
  const [secondNumber, setSecondNumber] = useState();
  const [thirdNumber, setThirdNumber] = useState();
  const [fourthNumber, setFourthNumber] = useState();
  const [randomNumber, setRandomNumber] = useState();

  const onChangeLimit = (num, func) => {
    if (num < 8) {
      func(num);
    } else {
      alert("Invalid input, please enter a number between 0 and 7");
    }
  };

  const onClick = () => {
    setRow(++row);
    setGuesses(
      (guesses +=
        "\n" +
        firstNumber.toString() +
        secondNumber.toString() +
        thirdNumber.toString() +
        fourthNumber.toString())
    );
    setFirstNumber();
    setSecondNumber();
    setThirdNumber();
    setFourthNumber();
  };

  const showGuesses = () => {
    if (row >= 11) {
      alert("Out of tries!");
    }
    if (row > 1) {
      return (
        <View>
          <Text> Past Guesses:</Text>
          <Text>{guesses}</Text>
        </View>
      );
    }
  };

  const getNumber = async () => {
    try {
      const response = await fetch(
        "https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new"
      ).then((response) => {
        return response.text();
      });
      console.log(response);
      setRandomNumber(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNumber();
  }, []);

  return (
    <View>
      <View style={styles.row}>
        <View style={styles.oneAttemptRow}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(num) => onChangeLimit(num, setFirstNumber)}
            value={firstNumber}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(num) => onChangeLimit(num, setSecondNumber)}
            value={secondNumber}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(num) => onChangeLimit(num, setThirdNumber)}
            value={thirdNumber}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(num) => onChangeLimit(num, setFourthNumber)}
            value={fourthNumber}
          />
        </View>
        <Button style={styles.button} title="Go" onPress={onClick} />
      </View>
      <View>{showGuesses()}</View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 40,
    borderWidth: 2,
    borderRadius: 5,
    padding: 3,
    margin: 10,
    backgroundColor: "white",
    borderColor: "#6EB0AE",
  },
  oneAttemptRow: {
    // paddingTop: 40,
    flexDirection: "row",
  },
  row: {
    alignSelf: "center",
    alignItems: "center",
    paddingTop: 100,
    flexDirection: "row",
  },
  guesses: {},
});

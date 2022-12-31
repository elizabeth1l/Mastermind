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

  const onChangeLimit = (num, func) => {
    if (num < 8) {
      func(num);
    } else {
      alert("Invalid input, please enter a number between 0 and 7");
      func("");
    }
  };

  const checkRightNumbers = () => {
    let rightNumbers = 0;
    randomNumber.includes(firstNumber) ? rightNumbers++ : rightNumbers;
    randomNumber.includes(secondNumber) ? rightNumbers++ : rightNumbers;
    randomNumber.includes(thirdNumber) ? rightNumbers++ : rightNumbers;
    randomNumber.includes(fourthNumber) ? rightNumbers++ : rightNumbers;
    console.log(rightNumbers);
  };

  const onClick = () => {
    setRow(++row);
    setGuesses(
      (guesses +=
        "\n" +
        firstNumber.toString() +
        secondNumber.toString() +
        thirdNumber.toString() +
        fourthNumber.toString() +
        "\n")
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
        <View style={styles.chart}>
          <View style={styles.leftChart}>
            <Text> Past Guesses</Text>
            <Text>{guesses}</Text>
          </View>
          <View style={styles.rightChart}>
            <Text>Right Place </Text>

            <Text>Right Number</Text>
            <Text>{checkRightNumbers()}</Text>
          </View>
        </View>
      );
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
  chart: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    margin: 30,
    padding: 20,
    borderRadius: 10,
  },
  leftChart: {
    // flexDirection: "column",
    alignItems: "center",
    // justifyContent: "center",
  },
  rightChart: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

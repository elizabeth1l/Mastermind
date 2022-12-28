import react, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const OneAttemptRow = () => {
  const [row, setRow] = useState(1);
  const [firstNumber, setFirstNumber] = useState();
  const [secondNumber, setSecondNumber] = useState();
  const [thirdNumber, setThirdNumber] = useState();
  const [fourthNumber, setFourthNumber] = useState();

  const onChangeLimit = (num, func) => {
    if (num < 8) {
      func(num);
    } else {
      alert("Invalid input, please enter a number between 0 and 7");
      func("");
    }
  };

  return (
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
  );
};

const GameScreen = () => {
  return (
    <View style={styles.row}>
      <OneAttemptRow />
      <TouchableOpacity style={styles.button}>
        <Text>Submit</Text>
      </TouchableOpacity>
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
    borderColor: "#5A4AE3",
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
  button: {
    margin: 15,
    borderWidth: 1,
    padding: 3,
    borderRadius: 3,
    borderColor: " white",
  },
});

import react, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  Modal,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";

const GameScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  let [tries, setTries] = useState(1);
  let [guesses, setGuesses] = useState("");
  const [firstNumber, setFirstNumber] = useState();
  const [secondNumber, setSecondNumber] = useState();
  const [thirdNumber, setThirdNumber] = useState();
  const [fourthNumber, setFourthNumber] = useState();
  const [randomNumberArray, setRandomNumberArray] = useState();
  let [rightNumbers, setRightNumbers] = useState(0);
  let [rightNumbersString, setRightNumbersString] = useState("");
  let [rightPositions, setRightPositions] = useState(0);
  let [rightPositionsString, setRightPositionsString] = useState("");

  useEffect(() => {
    getNumber();
  }, []);

  const getNumber = async () => {
    try {
      const response = await fetch(
        "https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new"
      ).then((response) => {
        return response.text();
      });
      let randomNumberArray = Array.from(response);
      randomNumberArray = randomNumberArray.filter((a) => a !== "\n");
      setRandomNumberArray(randomNumberArray);
      console.log(randomNumberArray);
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

  const addToDictionary = (dictionary, val) => {
    if (val in dictionary) {
      dictionary[val]++;
    } else {
      dictionary[val] = 1;
    }
  };

  const checkRightNumbers = () => {
    let guessDictionary = {};

    addToDictionary(guessDictionary, firstNumber);
    addToDictionary(guessDictionary, secondNumber);
    addToDictionary(guessDictionary, thirdNumber);
    addToDictionary(guessDictionary, fourthNumber);

    let currentRightNumbers = 0;

    console.log(randomNumberArray);
    for (let i = 0; i < randomNumberArray.length; i++) {
      if (
        randomNumberArray[i] in guessDictionary &&
        guessDictionary[randomNumberArray[i]] > 0
      ) {
        currentRightNumbers++;
        guessDictionary[randomNumberArray[i]]--;
      }
    }
    setRightNumbers(currentRightNumbers);
    setRightNumbersString(
      (rightNumbersString += "\n" + currentRightNumbers + "\n")
    );
  };

  const checkRightPositions = () => {
    let currentRightPositions = 0;
    let guessArray = [firstNumber, secondNumber, thirdNumber, fourthNumber];
    // guessArray.push();
    for (let i = 0; i < guessArray.length; i++) {
      if (randomNumberArray[i] === guessArray[i]) {
        currentRightPositions++;
      }
    }
    setRightPositions(currentRightPositions);

    if (currentRightPositions === 4) {
      setModalVisible(true);
    }

    setRightPositionsString(
      (rightPositionsString += "\n" + currentRightPositions + "\n")
    );
  };

  const goOnPress = () => {
    checkRightNumbers();
    checkRightPositions();
    setTries(++tries);
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

  const restartOnPress = () => {
    getNumber();
    setFirstNumber();
    setSecondNumber();
    setThirdNumber();
    setFourthNumber();
    setTries(1);
    setRightNumbers(0);
    setRightPositions(0);
    setRightPositionsString("");
    setRightNumbersString("");
    setGuesses("");
  };

  const showGuessesAndQty = () => {
    if (tries > 10) {
      alert("Out of tries!");
    }
    if (tries > 1) {
      return (
        <View style={styles.chart}>
          <View style={styles.guesses}>
            <Text> Past Guesses</Text>
            <Text>{guesses}</Text>
          </View>
          <View style={styles.positions}>
            <Text>Right Place </Text>
            <Text>{rightPositionsString}</Text>
          </View>
          <View style={styles.numbers}>
            <Text>Right Number</Text>
            <Text>{rightNumbersString}</Text>
          </View>
        </View>
      );
    }
  };

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
        <Button style={styles.button} title="Go" onPress={goOnPress} />
      </View>
      <View style={styles.countdown}>
        <Text>Tries Remaining: {11 - tries} </Text>
      </View>
      <View>{showGuessesAndQty()}</View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={restartOnPress}>
          <Text style={styles.buttonText}>Restart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Hint</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>You win!</Text>
            <Button
              onPress={() => setModalVisible(!modalVisible)}
              title={"Close"}
            />
            <Button
              onPress={() => setModalVisible(!modalVisible)}
              title={"Play Again"}
            />
          </View>
        </View>
      </Modal>
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
  guesses: {
    alignItems: "center",
  },
  positions: {
    alignItems: "center",
  },
  numbers: {
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 60,
    paddingVertical: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  countdown: {
    marginHorizontal: 35,
    paddingTop: 15,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 25,
  },
  button: {
    backgroundColor: "#6EB0AE",
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
});

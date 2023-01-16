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
import { db } from "../firebase";
import { ref, onValue, update } from "firebase/database";
import { SelectList } from "react-native-dropdown-select-list";

const GameScreen = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [hintModalVisible, setHintModalVisible] = useState(false);
  let [tries, setTries] = useState(1);
  let [points, setPoints] = useState(0);
  let [guesses, setGuesses] = useState("");
  const [randomNumberArray, setRandomNumberArray] = useState();
  let [randomHint, setRandomHint] = useState();
  let [rightNumbersString, setRightNumbersString] = useState("");
  let [rightPositionsString, setRightPositionsString] = useState("");
  let [selectedDifficulty, setSelectedDifficulty] = useState("");
  let [length, setLength] = useState(0);
  let [inputArray, setInputArray] = useState([]);

  const getNumber = async () => {
    try {
      const response = await fetch(
        `https://www.random.org/integers/?num=${length}&min=0&max=7&col=1&base=10&format=plain&rnd=new`
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

  // const onChangeLimit = (num, func) => {
  //   if (num < 8) {
  //     func(num);
  //   } else {
  //     alert("Invalid input, please enter a number between 0 and 7");
  //     func("");
  //   }
  // };

  const checkRightNumbers = () => {
    const addToDictionary = (dictionary, val) => {
      if (val in dictionary) {
        dictionary[val]++;
      } else {
        dictionary[val] = 1;
      }
    };

    let guessDictionary = {};

    for (let i = 0; i < inputArray.length; i++) {
      addToDictionary(guessDictionary, inputArray[i]);
    }

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
    setRightNumbersString(
      (rightNumbersString += "\n" + currentRightNumbers + "\n")
    );
  };

  const checkRightPositions = () => {
    let currentRightPositions = 0;
    // let guessArray = [firstNumber, secondNumber, thirdNumber, fourthNumber];
    for (let i = 0; i < inputArray.length; i++) {
      if (randomNumberArray[i] === inputArray[i]) {
        currentRightPositions++;
      }
    }

    if (currentRightPositions === length) {
      setPoints(100 - tries * 10);
      setModalVisible(true);
    }

    setRightPositionsString(
      (rightPositionsString += "\n" + currentRightPositions + "\n")
    );
  };

  const goOnPress = () => {
    console.log(inputArray);
    checkRightNumbers();
    checkRightPositions();
    setTries(++tries);
    setGuesses((guesses += "\n" + inputArray.join("") + "\n"));
    setInputArray([]);
  };

  const restartOnPress = () => {
    getNumber();
    setTries(1);
    setRightPositionsString("");
    setRightNumbersString("");
    setGuesses("");
    setInputArray([]);
  };

  const hintOnPress = (array) => {
    let randomIndex = Math.floor(Math.random() * array.length);
    console.log(array[randomIndex]);
    setRandomHint(array[randomIndex]);
    setHintModalVisible(true);
  };

  const updatePoints = () => {
    let totalPoints;
    const totalPointsFromDBRef = ref(db, "users/" + props.username + "/points");
    onValue(totalPointsFromDBRef, (snapshot) => {
      totalPoints = snapshot.val();
    });
    console.log("totalPoints", totalPoints);
    const updates = {};
    console.log("points:", points);
    updates["users/" + props.username + "/points"] = totalPoints += points;
    return update(ref(db), updates);
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

  const data = [
    { key: "1", value: "easy" },
    { key: "2", value: "medium" },
    { key: "3", value: "hard" },
  ];

  const setLengthOfRow = (val) => {
    if (val === "easy") {
      setLength(3);
    } else if (val === "medium") {
      setLength(4);
    } else {
      setLength(5);
    }
  };

  useEffect(() => {
    getNumber();
  }, [length]);

  const oneAttemptRow = () => {
    const arrayFromLength = Array.from({ length: length }, (_, index) => {
      return (
        <View>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(num) => {
              if (num > 7) {
                alert("Invalid input, please enter a number between 0 and 7");
                num = "";
              }
              let inputArrayCopy = [...inputArray];
              inputArrayCopy[index] = num;
              setInputArray(inputArrayCopy);
            }}
            value={inputArray[index]}
          />
        </View>
      );
    });
    return arrayFromLength;
  };

  return (
    <View>
      <View style={styles.dropdown}>
        <SelectList
          setSelected={(val) => setLengthOfRow(val)}
          data={data}
          save="value"
        />
      </View>

      <View style={styles.row}>
        <View style={styles.oneAttemptRow}>{oneAttemptRow()}</View>
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => hintOnPress(randomNumberArray)}
        >
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
            <Text style={styles.modalText}>You win {points} points!</Text>
            <Button
              onPress={() => {
                setModalVisible(!modalVisible);
                updatePoints();
              }}
              title={"Close"}
            />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={hintModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setHintModalVisible(!hintModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              I can't tell you how many or where... but there is a {randomHint}{" "}
              somewhere
            </Text>
            <Button
              onPress={() => {
                setHintModalVisible(!hintModalVisible);
              }}
              title={"Close"}
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
    flexDirection: "row",
  },
  row: {
    alignSelf: "center",
    alignItems: "center",
    paddingTop: 10,
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
  dropdown: {
    paddingTop: 80,
    width: 100,
    alignSelf: "center",
  },
});

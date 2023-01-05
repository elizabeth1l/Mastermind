import react, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import { db } from "../firebase";
import { signOut } from "firebase/auth";
import { ref, onValue } from "firebase/database";

const HomeScreen = (props) => {
  const [points, setPoints] = useState();

  const navigation = useNavigation();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  const getPointsFromDB = () => {
    const pointsFromDBRef = ref(db, "users/" + props.username + "/points");
    onValue(pointsFromDBRef, (snapshot) => {
      const data = snapshot.val();
      setPoints(data);
    });
  };

  useEffect(() => {
    getPointsFromDB();
  }, []);

  return (
    <View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.titleFont}>Welcome {props.username}</Text>
      </View>

      <View style={styles.pointsContainer}>
        <Text style={styles.text}>You currently have</Text>
        <Text style={styles.number}>{points}</Text>
        <Text style={styles.text}>points</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  button: {
    borderColor: "#6EB0AE",
    borderWidth: "2",
    backgroundColor: "white",
    width: "30%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonContainer: {
    padding: 30,
    alignItems: "flex-end",
  },
  buttonText: {
    color: "#6EB0AE",
    fontWeight: "700",
    fontSize: 16,
  },
  pointsContainer: {
    borderColor: "#6EB0AE",
    backgroundColor: "#6EB0AE",
    alignItems: "center",
    alignSelf: "center",
    width: 300,
    borderRadius: 20,
  },
  titleContainer: {
    paddingVertical: 50,
    paddingHorizontal: 25,
  },
  titleFont: {
    color: "black",
    fontSize: 30,
    fontWeight: "500",
  },
  text: {
    fontSize: 25,
    color: "white",
    margin: 40,
  },
  number: {
    color: "white",
    fontSize: 100,
  },
});

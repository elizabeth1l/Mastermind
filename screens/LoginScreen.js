import react, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../firebase";
import { ref, set } from "firebase/database";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const username = email.slice(0, email.indexOf("@"));

  const initUserData = () => {
    set(ref(db, "users/" + username.toLowerCase()), {
      email: email,
      points: 0,
    });
  };

  const signUpUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Signed up with email:", user.email);
        initUserData(user);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const loginUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Currently logged in:", user.email);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const navigation = useNavigation();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("TabNavigator", {
          username: user.email.slice(0, user.email.indexOf("@")),
        });
      }
    });
  });

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image
        style={styles.image}
        source={require("../Mastermind-1.png")}
      ></Image>
      <View style={styles.inputContainer}>
        {/* <Image style={styles.image} source={require("../Image2Speech-1.png")} /> */}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={loginUser} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={signUpUser}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 400,
    top: 80,
  },
  container: {
    flex: 2,
    alignItems: "center",
    backgroundColor: "#EFEFEF",
  },
  inputContainer: {
    top: 50,
    width: "80%",
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    top: 100,
  },
  button: {
    backgroundColor: "#6EB0AE",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#6EB0AE",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#6EB0AE",
    fontWeight: "700",
    fontSize: 16,
  },
});

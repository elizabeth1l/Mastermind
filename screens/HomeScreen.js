import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const HomeScreen = (props) => {
  const navigation = useNavigation();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View>
      <Text>Hello</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  button: {
    borderColor: "#5A4AE3",
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
    color: "#5A4AE3",
    fontWeight: "700",
    fontSize: 16,
  },
});

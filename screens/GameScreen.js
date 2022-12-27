import react from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";

const GameScreen = () => {
  return (
    <View>
      <View style={styles.oneAttemptRow}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={onChangeLimit}
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={onChangeLimit}
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={onChangeLimit}
        />
        <TextInput style={styles.input} keyboardType="numeric" maxLength={1} />
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  input: {
    height: 30,
    width: 30,
    borderWidth: 1,
    borderRadius: 5,
    padding: 3,
    margin: 12,
  },
  oneAttemptRow: {
    paddingTop: 40,
    flexDirection: "row",
  },
});

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import GameScreen from "./screens/GameScreen";
import InfoScreen from "./screens/InfoScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = ({ route }) => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="Home"
      children={() => <HomeScreen username={route.params.username} />}
      options={{
        tabBarIcon: () => (
          <MaterialCommunityIcons name="home" color="#6EB0AE" size={30} />
        ),
      }}
    />
    <Tab.Screen
      name="GameScreen"
      children={() => <GameScreen username={route.params.username} />}
      options={{
        tabBarIcon: () => (
          <MaterialCommunityIcons
            name="gamepad-variant"
            color="#6EB0AE"
            size={30}
          />
        ),
      }}
    />
    <Tab.Screen
      name="InfoSceen"
      component={InfoScreen}
      options={{
        tabBarIcon: () => (
          <MaterialCommunityIcons
            name="information"
            color="#6EB0AE"
            size={28}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#fff",
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },
// });

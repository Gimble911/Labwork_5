import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import React, { useCallback, useEffect, useState } from "react";
import TaskScreen from "./screens/TaskScreen";

const Stack = createNativeStackNavigator();
const globalScreenOptions = {
  headerStyle: { backgroundColor: "rgb(32, 137, 220)" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
  headerTitleAlign: "center"
};

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Entypo.font);

        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(
    async () => {
      if (appIsReady) {
        await SplashScreen.hideAsync();
      }
    },
    [appIsReady]
  );

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={globalScreenOptions}
        onLayout={onLayoutRootView}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Task" component={TaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Image } from "@rneui/base";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch(error => alert(error));
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN4t3YsaekS8sZLJ-F-TeHSnmC1GogJpdnew&usqp=CAU"
        }}
        style={{ width: 200, height: 200 }}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email Address"
          autoFocus
          type="email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={text => setPassword(text)}
          onSubmitEditing={signIn}
        />
      </View>
      <Button containerStyle={styles.button} onPress={signIn} title="Login" />
      <Button
        onPress={() => navigation.navigate("Register")}
        containerStyle={styles.button}
        type="outline"
        title="Register"
      />
      <View style={{ height: 50 }} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  inputContainer: {
    width: 300
  },
  button: {
    width: 200,
    marginTop: 10
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white"
  }
});

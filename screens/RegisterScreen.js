import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Text } from "@rneui/base";
import { auth } from "../firebase";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useLayoutEffect(
    () => {
      navigation.setOptions({
        headerBackTitle: "Back To Login"
      });
    },
    [navigation]
  );

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL:
            imageUrl ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBcqVu0y6BvV0odF-FaW9CSnpV8pjtthO4nrMeSt61Zan6UU6yfC_lpK5TlsSUpRDIEWQ&usqp=CAU"
        });
      })
      .catch(error => alert(error.message));
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 50 }}>
        Create Account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          autoFocus
          type="text"
          value={name}
          onChangeText={text => setName(text)}
        />
        <Input
          placeholder="Email Address"
          type="email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Input
          placeholder="Password"
          type="password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <Input
          placeholder="Link Profile Picture URL (optional)"
          type="text"
          value={imageUrl}
          onChangeText={text => setImageUrl(text)}
          onSubmitEditing={register}
        />
      </View>
      <Button
        raised
        containerStyle={styles.button}
        title="Register"
        onPress={register}
      />
      <View style={{ height: 50 }} />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white"
  },
  button: {
    width: 200,
    marginTop: 10
  },
  inputContainer: {
    width: 300
  }
});

import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase/compat";
import { Input, Button } from "@rneui/base";
import { StatusBar } from "expo-status-bar";

const TaskScreen = ({ route }) => {
  const todoRef = firebase.firestore().collection("todos");
  const [textHeading, onChangeHeadingText] = useState(route.params.item.name);
  const navigationn = useNavigation();

  const updateTodo = () => {
    if (textHeading && textHeading.length > 0) {
      todoRef
        .doc(route.params.item.id)
        .update({
          heading: textHeading
        })
        .then(() => {
          navigationn.navigate("Home");
        })
        .catch(error => {
          alert(error.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.inputContainer}>
        <Input
          onChangeText={onChangeHeadingText}
          value={textHeading}
          type="text"
          placeholder="Update Task"
          autoFocus
        />
      </View>
      <View>
        <Button
          title="Update Task"
          raised
          containerStyle={styles.buttonUpdate}
          onPress={() => {
            updateTodo();
          }}
        />
      </View>
    </View>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "top",
    padding: 10,
    backgroundColor: "white"
  },

  buttonUpdate: {
    width: 200,
    marginTop: 10
  },

  inputContainer: {
    width: 300
  }
});

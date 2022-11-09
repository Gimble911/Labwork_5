import { StyleSheet, TouchableOpacity, View, KeyboardAvoidingView, Text, FlatList, Keyboard, Pressable } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Avatar, Input, Button } from "@rneui/base";
import {auth, dp} from "../firebase";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase/compat";



const HomeScreen = ({ navigation }) => {

  const [todos, setTodos] = useState([]);
  const todoRef = firebase.firestore().collection("todos");
  const [addData, setAddData] = useState("");
  const navigationn = useNavigation();

  useEffect(()=> {
    todoRef
    .orderBy("createdAt", "desc")
    .onSnapshot(
        querySnapshot =>{
            const todos = []
            querySnapshot.forEach((doc) =>{
                const {heading} = doc.data()
                todos.push({
                    id: doc.id,
                    heading,
                })
            })
            setTodos(todos)
        }
    )
  }, [])

  const deleteTodo = (todos) => {
    todoRef
    .doc(todos.id)
    .delete()
    .then(()=>{
        alert("Task deleted!")
    })
    .catch(error =>{
        alert(error)
    })
  }

  const addTodo = () =>{
    if (addData && addData.length > 0){
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const data = {
            heading: addData,
            createdAt: timestamp
        };
        todoRef
        .add(data)
        .then(()=>{
            setAddData("");
            Keyboard.dismiss();
        })
        .catch(error =>{
            alert(error)
        })
    }
  }

const signOutUser = ()=>{
    auth.signOut().then(()=>{
        navigation.replace("Login")
    })
}

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "To Do",

      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
        <TouchableOpacity onPress={signOutUser} activeOpacity={0.6} >
          <Avatar rounded source={{uri: auth?.currentUser?.photoURL}}/>
          </TouchableOpacity>
        </View>
      ),
  
    });
  }, [navigation]);
  return(
<View style={styles.container}>
  <StatusBar style="light" />
  
  <View style={styles.inputContainer}>
  <Input
    placeholder="Write New Task!"
          autoFocus
          type="text"
          value={addData}
          onChangeText={(heading) => setAddData(heading)}
  />
  </View>
  <View>
 <Button
        raised
        containerStyle={styles.button}
        title="Add Task"
        onPress={addTodo}
      />
  </View>
  <View>
    <FlatList 
        data={todos}
        numColumns={1}
        renderItem={({item})=>(
            <View>
                <Pressable
                style={styles.taskContainer}
                onPress={() => navigationn.navigate("Task", {item})}
                >
                    <FontAwesome
                        name="trash-o"
                        color="red"
                        onPress={()=> deleteTodo(item)}
                        style={styles.todoIcon}
                        
                    />
                    <View style={styles.innerContainer}>
                        <Text style={styles.itemHeading}>
                            {item.heading[0].toUpperCase() + item.heading.slice(1)}
                        </Text>
                    </View>
                </Pressable>
            </View>
        )}
    />
  </View>

 
  </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "top",
        padding: 10,
        backgroundColor: "white",
        
    },
  button: {
    width: 200,
    marginTop: 10
  },
  buttonText: {
    width: 200,
    marginTop: 10
  },
  innerContainer:{
    width: 400,
    alignItems: "center",
    backgroundColor: "white",
    flexDirection: "column",
    marginLeft: 10
    
  },
  inputContainer:{
    width: 300
    
  },
  taskContainer:{
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    backgroundColor: "white",
    width: 400,
    flexDirection: "row"
    
  },
  itemHeading:{
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 22
  },
  todoIcon:{
    marginTop: 5,
    fontSize: 20,
    marginLeft: 1,
    alignItems: "flex-end",
    width: 10
  }
  
});
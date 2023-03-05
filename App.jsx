import React, { useState, useEffect } from "react";
import { theme } from "./colors";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RefreshControlBase, 
  StatusBar, StyleSheet, Text, View, 
  TouchableHighlight, TouchableOpacity,
  TouchableWithoutFeedback, TextInput,
  ScrollView, Alert
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";



const STORAGE_KEY="@toDos";




export default function App(){
  const [working, setWorking]=useState(true);
  const [text, setText]=useState("");
  const [toDos, setToDos]=useState({});


  const travel=()=>{
    setWorking(false);
    saveToggle(false);
  }
  const work=()=>{
    setWorking(true);
    saveToggle(true);
  };

  const saveToggle=async(toSave)=>{
    await AsyncStorage.setItem("@toggle",JSON.stringify(toSave));
    // console.log(toSave); check
  }
  const loadToogle=async()=>{
    const s = await AsyncStorage.getItem("@toggle");
    JSON.parse(s)? null:setWorking(false);
  }
  useEffect(()=>{
    loadToogle();
  },[]);


  const onChangeText=(payload)=>setText(payload);

  const saveToDos= async (toSave)=> {
    await AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(toSave));
  };
  const loadToDos=async()=>{
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    setToDos(s?JSON.parse(s):{});
  }
  useEffect(()=>{
    loadToDos();
  },[]);

  const addToDo=async()=>{
    if(text===""){
      return
    }
    //save to do
    const newToDos={
      ...toDos,
      [Date.now()]:{text, working, finished:false},
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");

  }
  console.log(toDos);  //check
  const deleteToDo=async(key)=>{
    Alert.alert(
      "Dlete To Do", 
      "Are you sure?",
      [
      {text:"cancel"},
      {text:"I'm sure",
      onPress:async()=>{
        const newToDos={...toDos};
        delete newToDos[key];
        setToDos(newToDos);
        await saveToDos(newToDos);
      }
    }]);
  }
  const finishToDo=async(key)=>{
    const newToDos={...toDos};
    const nowBool=newToDos[key].finished;
    console.log(nowBool);
    newToDos[key].finished=!nowBool;
    setToDos(newToDos);
    await saveToDos(newToDos);
  }
  return(
    <View style={styles.containter}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{...styles.btnText, color:working?"white":theme.grey}}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{...styles.btnText, color:!working?"white":theme.grey}}>Travel</Text>
        </TouchableOpacity>
      </View>


      <View style={{flex:1}}>
        <TextInput 
        onSubmitEditing={addToDo}
        returnKeyType="done"
        onChangeText={onChangeText}
        value={text}
        placeholder={working?"add a To Do":"where do you want to go?"} 
        style={styles.input}>
        </TextInput>
        <ScrollView>{

          Object.keys(toDos).map(key=>
            toDos[key].working===working?
          <View key={key}>
            <View style={styles.toDo} key={key}>
            {toDos[key].finished?
              <View style={styles.textPlusCheckbox}  key={key}>
                <Text style={styles.toDoTextFinished}>{toDos[key].text}</Text>
                <TouchableOpacity onPress={()=>finishToDo(key)}>
                  <Text>🟦</Text>
                </TouchableOpacity>
              </View>
              :<View style={styles.textPlusCheckbox} key={key}>
                <Text style={styles.toDoText}>{toDos[key].text}</Text>
                <TouchableOpacity onPress={()=>finishToDo(key)}>
                  <Text>🟥</Text>
                </TouchableOpacity>
              </View>
              }
              
              <TouchableOpacity style={{flex: 1}} onPress={()=>deleteToDo(key)}>
                <Text>❌</Text>
              </TouchableOpacity>
            </View>
          </View>:null
          )

        }</ScrollView>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  containter:{
    flex:1,
    backgroundColor:theme.bg,
    paddingHorizontal:20,
  },
  header:{
    justifyContent:"space-between",
    flexDirection:"row",
    marginTop:100,
  },
  btnText:{
    fontSize:44,
    fontWeight:"600",
  },
  input:{
    backgroundColor:"white",
    paddingVertical:10,
    paddingHorizontal:20,
    marginVertical:20,
    fontSize:18,
    borderRadius:20,
  },
  toDo:{
    backgroundColor:theme.toDoBg,
    borderRadius:30,
    marginBottom:10,
    paddingVertical:20,
    paddingHorizontal:20,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",

  },
  toDoText:{
    color:"white",
    fontSize:18,
    fontWeight:"500",
  },
  toDoTextFinished:{
    color:"white",
    fontSize:18,
    fontWeight:"500",
    textDecorationLine:'line-through',
    color:"grey",
  },
  
  textPlusCheckbox:{
    flex:10,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
  },
  deleteBtn:{
    flex: 1,
  }
});
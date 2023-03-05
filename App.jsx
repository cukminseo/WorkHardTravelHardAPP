import React, { useState } from "react";
import { theme } from "./colors";
import { RefreshControlBase, 
  StatusBar, StyleSheet, Text, View, 
  TouchableHighlight, TouchableOpacity,
  TouchableWithoutFeedback, TextInput,
  ScrollView
} from "react-native";

export default function App(){
  const [working, setWorking]=useState(true);
  const [text, setText]=useState("");
  const [toDos, setToDos]=useState({});


  const travel=()=>setWorking(false);
  const work=()=>setWorking(true);
  const onChangeText=(payload)=>setText(payload);
  const addToDo=()=>{
    if(text===""){
      return
    }
    //save to do
    const newToDos={
      ...toDos,
      [Date.now()]:{text, work:working},
    };
      setToDos(newToDos);

    setText("");

  }
  console.log(toDos);
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
          <View key={key}>
            <Text style={styles.toDo} key={key}>
              <Text style={styles.toDoText}>{toDos[key].text}</Text>
            </Text>
          </View>
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
    borderRadius:30,//not work:P
    marginBottom:10,
    paddingVertical:20,
    paddingHorizontal:20,
  },
  toDoText:{
    color:"white",
    fontSize:18,
    fontWeight:"500",
  }
});
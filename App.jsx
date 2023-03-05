import React, { useState } from "react";
import { theme } from "./colors";
import { RefreshControlBase, 
  StatusBar, StyleSheet, Text, View, 
  TouchableHighlight, TouchableOpacity,
  TouchableWithoutFeedback, Textinput, TextInput
} from "react-native";

export default function App(){
  const [working, setWorking]=useState(true);
  const [text, setText]=useState("");
  const travel=()=>setWorking(false);
  const work=()=>setWorking(true);
  const onChangeText=(payload)=>setText(event);
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
      <View>
        <TextInput 
        onChangeText={onChangeText}
        value={text}
        placeholder={working?"add a To Do":"where do you want to go?"} style={styles.input}>

        </TextInput>
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
    borderRadius:30,
    marginTop:20,
    fontSize:18,
  }
});
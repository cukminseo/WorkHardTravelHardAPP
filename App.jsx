import React, { useState } from "react";
import { theme } from "./colors";
import { RefreshControlBase, 
  StatusBar, StyleSheet, Text, View, 
  TouchableHighlight, TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";

export default function App(){
  // const [working, setWorking]=useState(true);
  // const travel=()=>setWorking(flase);
  // const work=()=>setWorking(true);
  return(
    <View style={styles.containter}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0}>
          <Text style={styles.btnText}>Work</Text>
        </TouchableOpacity>
        <TouchableWithoutFeedback 
        underlayColor="red"
        activeOpacity={0.5}
        onPress={()=>console.log("pressed")}>
          <Text style={styles.btnText}>Travel</Text>
        </TouchableWithoutFeedback>
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
    color:"white",
  }
});
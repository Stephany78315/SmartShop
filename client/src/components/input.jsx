import {useEffect, useState} from 'react';
import { View, Text, TextInput } from 'react-native';
import { fonts, inputs} from "../css/styles";

const Input = (props) => {
 const [text, setText] = useState('');
 useEffect(() => {
  setText(props.textIn);
 },[]);

 const handleInputChange = (a) => {
  setText(a);
  props.onValue(a);
 }
 
  return (
   <View>
    <Text style={[styles.title,fonts.textButtonRegular]}>{props.title}</Text>
    <TextInput
        style={[inputs.largeTextSpace, fonts.subHeaderRegular, { width: props.width, paddingLeft:10}]}
        value={text}
        onChangeText={handleInputChange}
        keyboardType={props.keyboardType || 'default'}
        secureTextEntry={props.secureTextEntry || false }
      />
   </View>
  );
}

const styles = {
 title: {
  margin: '3%',
 },
 input: {
  paddingLeft: 10,
 }
};

export default Input;

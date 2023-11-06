import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { RadioButton as Radio } from 'react-native-paper';
import { fonts } from '../css/styles';

const RadioButton = ({ title, options, selected, onValueChange }) => {
  return (
    <View>
      <Text style={[styles.label,fonts.textButtonRegular]}>{title}</Text>
      
      <View  style={styles.containerRadio}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
       {options.map((option) => (
        <View key={option.value} style={styles.radio}>
           <Radio
             value={option.value}
             status={selected === option.value ? 'checked' : 'unchecked'}
             onPress={() => onValueChange(option.value)}
             color={option.color}
           />
           <Text style={fonts.subHeaderRegular}>{option.label}</Text>
        </View>
       ))}
       </ScrollView>
      </View>
      
    </View>
  );
};

const styles = {
  label: {
   color:'black',
   margin: '3%',
  },
  optionText: {
    fontSize: 14,
    marginLeft: 5,
  },
  containerRadio: {
   flexDirection: 'row',
   justifyContent: 'center',
  },
  radio: {
   flexDirection: 'row',
   alignItems: 'center',
  }
};

export default RadioButton;

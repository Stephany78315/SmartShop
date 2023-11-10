import React from 'react';
import { StyleSheet, View,TouchableOpacity} from 'react-native';
import {colors, dropShadowS} from '../css/styles.js';
import { Feather } from '@expo/vector-icons'; 

const HeaderMenu = ({navigation}) => {
 return (
  <View style={[styles.container, dropShadowS]}>
    <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.touch}>
      <Feather name="menu" size={26} color="black" />
    </TouchableOpacity>
  </View>
 )
}

const styles = StyleSheet.create({
 container: {
  backgroundColor: colors.platine025,
  paddingLeft: 20,
  width: '100%',
  height: 40,
  alignItems: 'left',
  justifyContent: 'center',
 },
 touch: {
  width: 29, 
  height: 25, 
  alignItems: 'center'
},
 icon: {
  width: '100%',
  height: '100%',
 }
});

export default HeaderMenu;
import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {colors, fonts, dropShadowS} from '../css/styles.js';
import { useNavigation } from '@react-navigation/native';

const HeaderMenu = ({navigation}) => {
 return (
  <View style={[styles.container, dropShadowS]}>
    <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.touch}>
      {/* Flecha de regreso */}
      <Image source={require('../images/icons/menuIcon.png')} style={styles.icon}/>
    </TouchableOpacity>
  </View>
 )
}

const styles = StyleSheet.create({
 container: {
  backgroundColor: colors.platine025,
  padding: 20,
  width: '100%',
  height: 60,
  alignItems: 'left',
  justifyContent: 'center',
 },
 touch: {
  width: 29, 
  height: 40, 
  alignItems: 'center'
},
 icon: {
  width: '100%',
  height: '100%',
 }
});

export default HeaderMenu;
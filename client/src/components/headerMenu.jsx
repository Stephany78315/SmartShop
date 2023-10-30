import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {colors, fonts, dropShadowS} from '../css/styles.js';

const HeaderMenu = () => { 
 console.log("headerMenu")
 return (
  <View style={[styles.container, dropShadowS]}>
      {/*<TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 25, height: 25, alignItems: 'right'}}>*/}
        {/* Flecha de regreso */}
        <Image source={require('../images/icons/menuIcon.png')} style={styles.icon}/>
      {/*</TouchableOpacity>*/}
    </View>
 )
}

const styles = StyleSheet.create({
 container: {
  backgroundColor: colors.platine025,
  padding: 10,
  width: '100%',
  height: 60,
  alignItems: 'left',
  justifyContent: 'center',
 },
 icon: {
  width: '8%',
  height: '80%',
 }
});

export default HeaderMenu;
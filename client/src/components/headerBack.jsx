import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {colors, fonts, dropShadowS} from '../css/styles.js';

const HeaderBack = ({title, navigation}) => {
 return (
  <View style={[styles.container, dropShadowS]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 25, height: 25, alignItems: 'right'}}>
        {/* Flecha de regreso */}
        <Image source={require('../images/arrowBack.png')} style={styles.icon}/>
      </TouchableOpacity>
      <Text style={[fonts.doubleHeaderRegular, styles.title]}>
        {title}
      </Text>
    </View>
 )

}

const styles = StyleSheet.create({
 container: {
  backgroundColor: colors.platine025,
  padding: 10,
  width: '100%',
  height: 60,
  flexDirection: 'row',
  alignItems: 'center',
 },
 icon: {
  width: '100%',
  height: '100%',
 },
 title:{
  flex: 1,
  textAlign: 'center',
  backgroundColor: 'transparent',
 }
});

export default HeaderBack;
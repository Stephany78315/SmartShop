import { StatusBar } from "expo-status-bar";
import React from "react";
import { View,Image, TouchableOpacity, Text,Dimensions  } from "react-native";
import { colors, fonts, buttons } from "../css/styles";
import HeaderMenu from "../components/headerMenu";

const heightWindow = Dimensions.get("window").height;

const CamScanner = ({navigation}) => {
   return (
      <View style={styles.container}>
         <StatusBar hidden/>
         
         <HeaderMenu navigation={navigation}/>
    
         <View style={styles.camScannerContainer}>
         </View>
         
         <View style={styles.logoContainer}>
            <Image
            source={require('../images/logoSmartShop.png')}
            style={styles.logoImage}
            />
         </View>
         
         <View>
                <TouchableOpacity onPress = {() => navigation.navigate('Main',{screen:'Inicio de Sesión'})} style={[buttons.thick, { margin: 15, alignSelf: 'center' }]}>
                <Text style={[fonts.button, {color: 'white'}]}>Buscar</Text>
                </TouchableOpacity>
            </View>

      </View>
   )
}

const styles = {
   container:{
    backgroundColor: 'white',
    height: heightWindow,
   },
   camScannerContainer:{
      width: '100%',
      height: '45%',
      marginTop: '0%',
      backgroundColor: colors.ruby200, 
      alignSelf: 'center',
   },
   logoContainer: {
      marginTop: '5%',
      width: 128,
      height: 170,
      alignSelf: 'center',      
    },
    logoImage: {
      resizeMode: "cover",
      width:128,
      height: 170,
      alignSelf: 'center',
    },
};

export default CamScanner;
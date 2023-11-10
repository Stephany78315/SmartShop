import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View,Image, TouchableOpacity, Text,Dimensions, StyleSheet  } from "react-native";
import { colors, fonts, buttons, borderRadius, dropShadowS } from "../css/styles";
import HeaderMenu from "../components/headerMenu";

const heightWindow = Dimensions.get("window").height;

const CamScanner = ({navigation}) => {
   const [BCproduct, setBCproduct] = useState(3017624010701);
   const [infoProduct, setInfoProduct] = useState(null);
   const showProduct  = null;

   useEffect(() => {
      if(BCproduct !== null) {
         console.log('La camara detectó un código de barras');
         //GEt a OFF
         
         fetchData();
      }
    }, [BCproduct]);


   const fetchData = async () => {
      try {
        const response = await fetch('https://world.openfoodfacts.net/api/v2/product/' + BCproduct);
        const data = await response.json();
        setInfoProduct(data);
      } catch (error) {
        console.error('Error al obtener la información', error);
      }
   };

   const renderNutriScore = (grade) => {
      switch (grade) {
         case 'a':
          return <Image source={require('../images/nutriScore/A.png')} style={{width: 90, height: 30, alignSelf: 'center'}}/>;
         case 'b':
         return <Image source={require('../images/nutriScore/B.png')} style={{width: 90, height: 30, alignSelf: 'center'}}/>;
         case 'c':
          return <Image source={require('../images/nutriScore/C.png')} style={{width: 90, height: 30, alignSelf: 'center'}}/>;
         case 'd':
         return <Image source={require('../images/nutriScore/D.png')} style={{width: 90, height: 30, alignSelf: 'center'}}/>;
         case 'e':
         return <Image source={require('../images/nutriScore/E.png')} style={{width: 90, height: 30, alignSelf: 'center'}}/>;
        default:
          return <Image source={require('../images/nutriScore/null.png')} style={{width: 90, height: 30, alignSelf: 'center'}}/>;
      }
    };

   return (
      <View style={styles.container}>
         <StatusBar hidden/>
         
         <HeaderMenu navigation={navigation}/>
    
         <View style={styles.camScannerContainer}>
         </View>
         
         {infoProduct !== null ? (
            <View style={[styles.cardContainer,dropShadowS]}>
               <View style={styles.header}>
                  <Text style={fonts.subHeaderRegular}>Recomendación</Text>
               </View>
               
               <View style={{width: '94%', height: '32%', marginLeft: '10%', marginTop:'3%',marginBottom: '3%', flexDirection: 'row',}}>
                  <Image source={{uri: infoProduct["product"]["selected_images"]["front"]["display"]["en"]}} style={{width: 70, height: 100}}/>
                  <View style={{flexDirection: 'column', marginLeft: '10%'}}>
                     <Text style={fonts.button}>{infoProduct["product"]["product_name"]}</Text>
                     <Text style={fonts.textButtonRegular}>{infoProduct["product"]["brands"]}</Text>
                  </View>
               </View>

               <Text style={[fonts.textButtonRegular, {marginLeft: '5%'}]}>Nutri Score</Text>
                  {renderNutriScore(infoProduct["product"]["nutriscore_grade"])}
               <Text style={[fonts.textButtonRegular, {marginLeft:'5%'}]}>Eco Score</Text>
                  {renderNutriScore(infoProduct["product"]["ecoscore_grade"])}  

               <TouchableOpacity onPress = {() => navigation.navigate('Main',{screen:'Información del Producto',params: {productInfo: infoProduct, navigation: navigation}})}>
                  <Text style={[fonts.titleRegular, {color: colors.ruby200, textDecorationLine: 'underline',marginTop: 4, alignSelf: 'center'}]}>Más Información</Text>
               </TouchableOpacity>
            </View>
            
         ):
         (
            <View>
               <View style={styles.logoContainer}>
               <Image
               source={require('../images/logoSmartShop.png')}
               style={styles.logoImage}
               />
            </View>
            
            <View>
               <TouchableOpacity onPress = {() => navigation.navigate('Main',{screen:'Información del Producto',params: {productInfo: infoProduct, navigation: navigation}})} style={[buttons.thick, { margin: 15, alignSelf: 'center' }]}>
               <Text style={[fonts.button, {color: 'white'}]}>Buscar</Text>
               </TouchableOpacity>
            </View>
            </View>
         )}

         

      </View>
   )
}

const styles = StyleSheet.create({
   container:{
    backgroundColor: 'white',
    height: heightWindow,
   },
   camScannerContainer:{
      width: '100%',
      height: '35%',
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



   cardContainer: {
      backgroundColor: 'white',
      width: '80%',
      height: '50%',
      margin: '5%',
      alignSelf: 'center',
      borderRadius: borderRadius.L,
   },
   header: {
      backgroundColor: colors.platine100,
      width: '100%',
      height: '15%',
      justifyContent: 'center',
      borderTopLeftRadius: borderRadius.L, 
      borderTopRightRadius: borderRadius.L,
      flexDirection: 'row',
      padding: '4%',
   }
});

export default CamScanner;
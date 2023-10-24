import React from 'react'
import {Image, StyleSheet, Text, View, TouchableOpacity, SafeAreaView} from 'react-native'
import Carousel from '../components/carousel.jsx'
import { buttons, fonts} from '../css/styles.js';

const images = [
    "https://n9.cl/mssjl",
    "https://acortar.link/zhjFDJ",
    "https://acortar.link/vqVffG"
  ];

  export default function Introduction({navigation}) {
    console.log('Estas en introduction')

    return (
        <SafeAreaView style={styles.container}>
        
            <View style={styles.logoContainer}>
                <Image
                source={require('../images/logoSmartShop.png')}
                style={styles.logoImage}
                />
            </View>

            <Carousel prop1={images}/>
                
            <View>
                {/* Utiliza el componente Link para redirigir */}
                <TouchableOpacity onPress = {() => navigation.navigate('Login')} style={[buttons.thick, { marginBottom: 10 }]}>
                <Text style={[fonts.button, {color: 'white'}]}>Empezar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    logoContainer: {
      marginTop: '10%',
      width: 75,
      height:100,
    },
    logoImage: {
      resizeMode: "cover",
      width:'100%',
      height: '100%',
    },
})


import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Animated, StyleSheet, Text, View, Image, Dimensions, SafeAreaView , TouchableOpacity} from 'react-native';
import {colors, buttons, fonts, borderRadius} from '../css/styles.js';

const width = Dimensions.get("window").width;

const container_width = width * 0.7;
const side_space = (width - container_width) / 2;
const spacing = 10;

const Carousel = ({prop1}) => {
  const images = prop1

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Listener para actualizar el índice actual
  scrollX.addListener(({ value }) => {
    const index = Math.round(value / container_width);
    setCurrentIndex(index);
  });

  const handleButtonPress = () => {
    // Lógica a ejecutar cuando se presione el botón
    console.log('Botón presionado');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <View style={styles.carouselContainer}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../images/logoSmartShop.png')}
          style={styles.logoImage}
        />
      </View>
      <Animated.FlatList
        onScroll={Animated.event(
          [{nativeEvent: { contentOffset: {x: scrollX}}}], {useNativeDriver: true}
        )}
        data={images}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingTop:8, marginHorizontal: side_space }}
        //Cuando lo pasas muy rapido las imagenes toma impulso y puede ir hasta el final, esto lo cancela.
        decelerationRate={0}
        //Para que cada vez que se pase de imagen esta quede al centro.
        snapToInterval={container_width}
        snapToAlignment="start"
        scrollEventThrottle={16}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * container_width,
            index * container_width,
            (index + 1) * container_width,
          ]

          const outputRange = [0, 30, 0];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange
          });

          return (
            <View style={{ width: container_width-15}}>
              <Animated.View
                style={{
                  marginHorizontal: spacing,
                  borderRadius: 34,
                  backgroundColor: colors.platine100,
                  alignItems: "center",
                  transform: [{ translateY }]
                }}
              >
                <Image source={{ uri: item }} style={styles.posterImage} />
              </Animated.View>
            </View>
          );
        }}
      />
       {/* Puntos (indicadores) debajo del carrusel */}
       <View style={styles.indicatorContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              { backgroundColor: index === currentIndex ? colors.platine400 : colors.platine100 },
            ]}
          />
        ))}
      </View>
      {/* Botón debajo de los puntos */}
      <TouchableOpacity onPress={handleButtonPress} style={[buttons.thick, {marginBottom: 60}]}>
          <Text style={fonts.button}>Presionar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  carouselContainer: {
    marginTop: 40,
    flex:1,
    alignItems: 'center',
  },
  logoContainer: {
    width: 110,
    height:150,
  },
  logoImage: {
    resizeMode: "cover",
    width:'100%',
    height: '100%',
  },
  posterImage: {
    width: "100%",
    height: container_width * 1.3,
    resizeMode: "cover",
    borderRadius: borderRadius.L,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default Carousel;
import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Animated, StyleSheet, View, Image, Dimensions, SafeAreaView} from 'react-native';
import {colors, borderRadius} from '../css/styles.js';

const width = Dimensions.get("window").width;

const container_width = width * 0.7;
const side_space = (width - container_width) / 2;
const spacing = 10;

const Carousel = ({prop1}) => {
  const images = prop1

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  scrollX.addListener(({ value }) => {
    const index = Math.round(value / container_width);
    setCurrentIndex(index);
  });
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <View style={styles.carouselContainer}>
      
      <Animated.FlatList
        onScroll={Animated.event(
          [{nativeEvent: { contentOffset: {x: scrollX}}}], {useNativeDriver: true}
        )}
        data={images}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginHorizontal: side_space }}
        decelerationRate={0}
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

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [0, 30, 0],
          });

          return (
            <View style={{ width: container_width-15}}>
              <Animated.View
                style={{
                  marginHorizontal: spacing,
                  borderRadius: borderRadius.L,
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
    marginTop: 0,
    flex:1,
    alignItems: 'center',
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
    marginVertical: 20,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default Carousel;
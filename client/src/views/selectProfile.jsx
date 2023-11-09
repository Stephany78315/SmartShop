import React , {useState} from 'react';
import {SafeAreaView, TouchableOpacity, Animated, Text,Image, View, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import { fonts} from '../css/styles.js';
import { gql, useQuery} from '@apollo/client';
import { StatusBar } from 'expo-status-bar';

const USERS_FROM_ACCOUNT = gql`
query Users_from_account($account_id: Int!) {
 users_from_account(account_id: $account_id) {
  user_name
  image
  user_id
 }
}
`;

const width = Dimensions.get("window").width;

const container_width = width * 0.7;

const SelectProfile = ({route, navigation}) => { 
 const { id } = route.params;
 const { loading, data } = useQuery(USERS_FROM_ACCOUNT, { variables: { account_id: id } });
 
 const scrollX = React.useRef(new Animated.Value(0)).current;
 const [currentIndex, setCurrentIndex] = useState(0);

 scrollX.addListener(({ value }) => {
  const index = Math.round(value / container_width);
  setCurrentIndex(index);
 });

 if (loading) {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="blue" />
      <Text>Cargando datos...</Text>
    </View>
  );
}
 return (
  <SafeAreaView style={styles.container}>
    <View>
     <Text style={[fonts.doubleHeadline, styles.title]}>¿Quién eres? Elige perfil ...</Text>
    </View>

    <View style={[styles.carouselContainer]}>
      <StatusBar hidden/>
      <Animated.FlatList
        onScroll={Animated.event(
          [{nativeEvent: { contentOffset: {x: scrollX}}}], {useNativeDriver: true}
        )}
        data={data.users_from_account}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 50,}}
        decelerationRate={0}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Main', {screen: 'Administración de Perfil' , params: {id_c: id, id_u: item.user_id, navigation:navigation}});
              }}
            >
              <View style={{ width: 150, height: 120}}>
                <Animated.View
                  style={{
                    paddingHorizontal: 13,
                    borderRadius: container_width,
                    backgroundColor: "white",
                    alignItems: "center",
                  }}
                >
                  <Image key={index.toString()} source={item.image ? { uri: item.image } : require(`../images/icons/profileCircleIcon.png`)} style={styles.posterImage} />
                </Animated.View>
                <Text style={[styles.imageText, fonts.titleRegular]}>{item.user_name}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      </View>

    <TouchableOpacity  onPress={() => navigation.navigate('Main',{screen: 'Administración de Perfil', params: {id_c: id, id_u: 0, navigation:navigation}})}>
      <Image style={{height: 55, width: 55}} source={require('../images/icons/plusIcon.png')}/>
    </TouchableOpacity>
  </SafeAreaView>
 )
};

const styles = StyleSheet.create({
title: {
 alignSelf: 'center',
 marginTop: '20%',
},
container: {
 flex: 1,
 //justifyContent: 'center',
 backgroundColor: '#fff',
 alignItems: 'center',
 },
 carouselContainer: {
  marginTop: 0,
  //flex:1,
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: container_width,
  backgroundColor: 'white',
 },
 posterImage: {
  width: "100%",
  height: "100%",
  resizeMode: "cover",
  borderRadius: container_width/2,
  margin:0,
  marginBottom: 0,
 },
 imageText: {
  marginTop: 5, // Espacio entre la imagen y el texto
  //marginHorizontal: 10,
  alignSelf: 'center',
  fontSize: 16, // Tamaño del texto
  color: "black", // Color del texto u otros estilos que desees
  textAlign: 'center',
},
})

export default SelectProfile;
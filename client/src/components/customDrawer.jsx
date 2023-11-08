import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image} from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons, AntDesign, MaterialIcons, FontAwesome5, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { fonts } from "../css/styles";

const CustomDrawer = (props) => {
  const navigateToScreen = (screenName) => {
    props.navigation.navigate(screenName);
  };

  return (
    <DrawerContentScrollView {...props}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../images/logoSmartShop.png")} // Reemplaza con la ruta de tu imagen de logo
          style={styles.logo}
        />
      </View>

      {/* Iconos lado a lado */}
      <View style={styles.iconContainer}>
         <TouchableOpacity
         style={styles.icon}
         onPress={() => navigateToScreen("Chat Bot")} // Redirige a la página deseada
         >
         <Octicons name="dependabot" size={24} color="black" />
         <Text style={fonts.textButtonRegular}>Chat Bot</Text>
         </TouchableOpacity>
         <TouchableOpacity
         style={styles.icon}
         onPress={() => navigateToScreen("Scanner")} // Redirige a la página deseada
         >
         <MaterialIcons name="qr-code-scanner" size={24} color="black" />
         <Text style={fonts.textButtonRegular}>Scanner</Text>
         </TouchableOpacity>
      </View>

      <DrawerItem
        label="Lista de compras"
        icon={({ color, size }) => (
          <FontAwesome5 name="list-ul" size={size} color={color} />
        )}
        labelStyle={[fonts.textButtonRegular,{color: 'black'}]}
        onPress={() => navigateToScreen("Introduction")}
      />
      <DrawerItem
        label="Recetas"
        icon={({ color, size }) => (
          <MaterialCommunityIcons name="chef-hat" size={size} color={color} />
        )}
        labelStyle={[fonts.textButtonRegular,{color: 'black'}]}
        onPress={() => navigateToScreen("Login")}
      />
      <DrawerItem
        label="Ayuda"
        icon={({ color, size }) => (
          <AntDesign name="infocirlceo" size={size} color={color} />
        )}
        labelStyle={[fonts.textButtonRegular,{color: 'black'}]}
        onPress={() => navigateToScreen("Introduction")}
      />
      <DrawerItem
        label="Configuración"
        icon={({size,color}) => (
         <MaterialIcons name="settings" size={size} color={color} />
       )}
        labelStyle={[fonts.textButtonRegular,{color: 'black'}]}
        onPress={() => navigateToScreen("Login")}
      />
      <DrawerItem
        label="Cambiar de usuario"
        icon={({color, size}) => (
         <MaterialIcons name="face" size={size} color={color} />
        )}
        labelStyle={[fonts.textButtonRegular,{color: 'black'}]}
        onPress={() => navigateToScreen("Introduction")}
      />
      <DrawerItem
        label="Cerrar sesión"
        icon={({ color, size }) => (
          <Ionicons name="ios-log-in" size={size} color={color} />
        )}
        labelStyle={[fonts.textButtonRegular,{color: 'black'}]}
        onPress={() => navigateToScreen("Login")}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
   logoContainer: {
     alignItems: "center",
     marginTop: 20,
   },
   logo: {
     width: 75, // Ajusta el tamaño de tu imagen de logo
     height: 100,
   },
   iconContainer: {
     flexDirection: "row",
     justifyContent: "center",
     padding: 20,
   },
   customIcon: {
      width: 30,
      height: 30,
   },
   icon: {
     alignItems: "center",
     marginHorizontal: 15,
   },
 });

export default CustomDrawer;

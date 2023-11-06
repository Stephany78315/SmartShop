import { View, StyleSheet, StatusBar, Dimensions, Text, TouchableOpacity, ScrollView} from "react-native";
import HeaderBack from "../components/headerBack";
import { dropShadowS, fonts, colors , borderRadius} from "../css/styles";
import CheckBox from "../components/checkBox";
import { useState } from "react";

const AplicationSettings = ({route, navigation}) => {

   const [settingsOptions, setSettingOptions] = useState([
      {name:"Notificación de productos acabados.", value:"unchecked"},
      {name:"Notificación de bajos precios.", value:"checked"},
      {name:"Notificacion en cambio de estados de los productos.", value:"checked"},
      {name:"En la lista de compras se muestre de principal lo que se tiene en el almacén. De lo contrario se muestra primero lo que se tiene que comprar.", value:"checked"},
      {name:"Si un producto pasa 2 meses en el estado de comprar pasa al estado de olvidado.", value:"checked"}
   ])

   const handleOptionChange = (name, value) => {
      // Crea una copia de la matriz settingsOptions
      const updatedSettingsOptions = [...settingsOptions];

      // Encuentra el elemento correspondiente en la copia de la matriz
      const targetOption = updatedSettingsOptions.find(option => option.name === name);

      if (targetOption) {
         // Actualiza el valor del check en el elemento objetivo
         targetOption.value = targetOption.value === 'checked' ? 'unchecked' : 'checked';

         // Actualiza el estado con la nueva copia de la matriz
         setSettingOptions(updatedSettingsOptions);
      }
    };

 return (
  <ScrollView style={styles.container}>
   <StatusBar hidden/>
   <HeaderBack title={"Ajustes de la aplicación"} navigation={navigation}/>

   <View style={[styles.containerForm, dropShadowS]}>
   {settingsOptions.map((option) => (
      <View style={styles.elementCheck} key={option.name}>
          <CheckBox
            key={option.name}
            label={option.name}
            checked={option.value === 'checked'}
            onChange={(checked) => handleOptionChange(option.name, checked)}
            navigation={navigation}
          />
      </View>
   ))}
   </View>
   

  </ScrollView>
 )
}

const styles = StyleSheet.create({
   containerForm:{
      backgroundColor: colors.platine025,
      margin: '10%',
      borderRadius: borderRadius.L,
      alignItems: 'right',
      paddingRight: '10%',
      width: '80%',
      paddingTop: '4%',
      paddingBottom: '7%',
      paddingLeft: '3%',

     },
   elementCheck:{
      //textAlign: 'center',
      margin: 10,
   }
});

export default AplicationSettings;
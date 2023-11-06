import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import { fonts, colors, dropShadowS, borderRadius} from '../css/styles';


const FormButtonsAndIcons = ({specify, title, navigation, information}) => {
  console.log("Form botones, information:", information);
  console.log('specify',specify);

 return (
  <View style={[styles.container, dropShadowS]}>
   {title ? <Text style={[fonts.title, {margin: 5, color: colors.platine400}]} >{title}</Text> : null}
      {specify.map((item, index) => (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', margin: '4%' }}>
         <Image source={item.icon} style={{ width: 30, height: 30, marginRight: '4%' }} />
         <View style={[styles.button, dropShadowS]}>
          <TouchableOpacity onPress={() => specify.navegateTo} >
           <Text style={[fonts.textButtonRegular, {textAlign: 'center'}]}>{item.text}</Text>
          </TouchableOpacity>
         </View>
        </View>
      ))}
    </View>
 );

}

const styles = StyleSheet.create({
 container: {
  backgroundColor: colors.platine025,
  margin: '5%',
  borderRadius: borderRadius.L,
  
 },
 button: {
  backgroundColor: colors.platine025,
  padding: 10,
  width: '85%',
  height: 40,
  borderRadius: borderRadius.L,
  
 },

});
export default FormButtonsAndIcons;
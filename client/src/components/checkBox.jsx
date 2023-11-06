import { View, StyleSheet, StatusBar, Dimensions, Text, TouchableOpacity, ScrollView} from "react-native";
import HeaderBack from "../components/headerBack";
import { dropShadowS, fonts, colors , borderRadius} from "../css/styles";


const CheckBox = ({label, checked, onChange, navigation}) => {

 return (
  <View>

   <TouchableOpacity onPress={() => onChange(!checked)}>
      <View style={styles.checkboxContainer}>
        <View style={[styles.checkbox, checked && styles.checked]} />
        <Text style={[styles.label, fonts.subHeaderRegular]}>{label}</Text>
      </View>
    </TouchableOpacity>

  </View>
 )
}

const styles = StyleSheet.create({
   checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 2,
      borderColor: colors.platine400,
      borderRadius: 5,
      marginRight: 10,
    },
    checked: {
      backgroundColor: colors.platine400,
    },
    label: {
      textAlign: 'left'
    },
});

export default CheckBox;
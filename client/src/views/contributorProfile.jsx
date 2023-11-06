import { View, StyleSheet, StatusBar, Dimensions, Text, TouchableOpacity, ScrollView} from "react-native";
import HeaderBack from "../components/headerBack";
import { dropShadowS, fonts, colors , borderRadius} from "../css/styles";


const ContributorProfile = ({route, navigation}) => {

 return (
  <ScrollView style={styles.container}>
   <StatusBar hidden/>
   <HeaderBack title={"Cuenta de contribuidor"} navigation={navigation}/>

   <View style={[styles.containerForm, dropShadowS]}>
      <View style={styles.itemForm}>
        <View style={[styles.buttonForm, dropShadowS]}>
        <TouchableOpacity onPress={() => console.log("Presionaste ")} >
          <Text style={[fonts.textButtonRegular, {textAlign: 'center'}]}>{"Recetas editadas"}</Text>
        </TouchableOpacity>
        </View>
       </View>

       <View style={styles.itemForm}>
        <View style={[styles.buttonForm, dropShadowS]}>
        <TouchableOpacity onPress={() => console.log("Presionaste ")} >
          <Text style={[fonts.textButtonRegular, {textAlign: 'center'}]}>{"Recetas añadidas"}</Text>
        </TouchableOpacity>
        </View>
       </View>

       <View style={styles.itemForm}>
        <View style={[styles.buttonForm, dropShadowS]}>
        <TouchableOpacity onPress={() => console.log("Presionaste ")} >
          <Text style={[fonts.textButtonRegular, {textAlign: 'center'}]}>{"Productos editados"}</Text>
        </TouchableOpacity>
        </View>
       </View>

       <View style={styles.itemForm}>
        <View style={[styles.buttonForm, dropShadowS]}>
        <TouchableOpacity onPress={() => console.log("Presionaste ")} >
          <Text style={[fonts.textButtonRegular, {textAlign: 'center'}]}>{"Productos añadidos"}</Text>
        </TouchableOpacity>
        </View>
       </View>

    </View>

  </ScrollView>
 )
}

const styles = StyleSheet.create({
 container:{
  flexGrow: 1,
  backgroundColor: 'white',
  
 },
 containerForm:{
  backgroundColor: colors.platine025,
  margin: '10%',
  borderRadius: borderRadius.L,
  alignItems: 'center',
  paddingBottom: 30,
  paddingTop: 20,
 },
 buttonForm:{
  backgroundColor: colors.platine025,
  padding: 10,
  width: '95%',
  height: 50,
  borderRadius: borderRadius.L,
 },
 itemForm: {
  flexDirection: 'row', 
  alignItems: 'center', 
  margin: '4%' 
 },
});

export default ContributorProfile;
import { View, StyleSheet, StatusBar, Dimensions, Text, TouchableOpacity, ScrollView} from "react-native";
import HeaderBack from "../components/headerBack";
import { dropShadowS, fonts, colors , borderRadius} from "../css/styles";
import RadioButton from "../components/radioButton";
import { useState } from "react";


const preferences = [
    { label: 'No importa', value: 'No importa', color: colors.platine400 },
    { label: 'Importa', value: 'Importa', color: colors.platine400 },
    { label: 'Importa Mucho', value: 'Importa Mucho', color: colors.platine400 },
    { label: 'Necesario', value: 'Necesario', color: colors.platine400 },
];

const FoodPreferences = ({route, navigation}) => {

  const [showQuaNutri, setShowQuaNutri] = useState(false);
  const [showIngredients, setIngredientss] = useState(false);
  const [showAllergens, setShowAllergens] = useState(false);
  
  const [qualityNutricionalOptions, setQualityNutricionalOptions] = useState([
    {name:"Sal en cantidad baja", value:"No importa"},
    {name:"Azúcares en cantidad baja", value: "No importa"},
    {name:"Grasas en cantidad baja", value:"No importa"}
  ]);
  const [ingredientsOptions, setIngredientsOptions] = useState([
    {name:"Vegano", value:"No importa"},
    {name:"Vegetariano", value: "No importa"},
  ]);
  const [allergensOptions, setAllergensOptions] = useState([
    {name:"Sin Gluten", value:"No importa"},
    {name:"Sin Leche", value: "No importa"},
    {name:"Sin Huevos", value:"No importa"}
  ])

  const qualityNutricional = () => {
    if(showQuaNutri == true){setShowQuaNutri(false)} else {setShowQuaNutri(true)};
  }
  const ingredientsShow = () => {
    if(showIngredients == true){setIngredientss(false)} else {setIngredientss(true)};
  }
  const allergensShow = () => {
    if(showAllergens == true){setShowAllergens(false)} else {setShowAllergens(true)};
  }

  const handleOptionChange = (name, value, section) => {
    // Selección de la sección adecuada para actualizar
    let updatedOptions = [];
    switch (section) {
      case "qualityNutricional":
        updatedOptions = qualityNutricionalOptions;
        break;
      case "ingredients":
        updatedOptions = ingredientsOptions;
        break;
      case "allergens":
        updatedOptions = allergensOptions;
        break;
      default:
        break;
    }
  
    // Actualiza el valor de la opción seleccionada
    const updatedOptionsList = updatedOptions.map((option) => {
      if (option.name === name) {
        return { ...option, value };
      }
      return option;
    });
  
    // Actualiza el estado correspondiente
    switch (section) {
      case "qualityNutricional":
        setQualityNutricionalOptions(updatedOptionsList);
        break;
      case "ingredients":
        setIngredientsOptions(updatedOptionsList);
        break;
      case "allergens":
        setAllergensOptions(updatedOptionsList);
        break;
      default:
        break;
    }
  };

 return (
  <ScrollView style={styles.container}>
   <StatusBar hidden/>
   <HeaderBack title={"Cuenta de contribuidor"} navigation={navigation}/>

   <View style={[styles.containerForm, dropShadowS]}>

      <TouchableOpacity onPress={qualityNutricional} >
      <View style={styles.itemForm}>
          <View style={[styles.buttonForm, dropShadowS]}>
            <Text style={[fonts.textButtonRegular, {textAlign: 'center'}]}>{"Calidad Nutricional"}</Text>
          </View>
      </View>
      </TouchableOpacity>
       {showQuaNutri ? 
          (qualityNutricionalOptions.map((option) => (
              <View key={option.name} style={{ marginBottom: 3 }}>
              <RadioButton
                key={option.name}
                title={option.name}
                options={preferences}
                selected={option.value ? option.value : null}
                onValueChange={(value) => handleOptionChange(option.name, value,"qualityNutricional")}
              />
              </View>
            )))
          : null
        }

      <TouchableOpacity onPress={ingredientsShow} >
        <View style={styles.itemForm}>
          <View style={[styles.buttonForm, dropShadowS]}>
          
            <Text style={[fonts.textButtonRegular, {textAlign: 'center'}]}>{"Ingredientes"}</Text>
          
          </View>
        </View>
       </TouchableOpacity>
       {showIngredients ? 
          (ingredientsOptions.map((option) => (
              <View key={option.name} style={{ marginBottom: 3 }}>
              <RadioButton
                key={option.name}
                title={option.name}
                options={preferences}
                selected={option.value ? option.value : null}
                onValueChange={(value) => handleOptionChange(option.name, value,"ingredients")}
              />
              </View>
            )))
          : null
        }

      <TouchableOpacity onPress={allergensShow} >
       <View style={styles.itemForm}>
        <View style={[styles.buttonForm, dropShadowS]}>
          <Text style={[fonts.textButtonRegular, {textAlign: 'center'}]}>{"Alérgenos"}</Text>
        </View>
       </View>
       </TouchableOpacity>
       {showAllergens ? 
          (
            
            allergensOptions.map((option) => (
              <View key={option.name} style={{ marginBottom: 3 }}>
              <RadioButton
                key={option.name}
                title={option.name}
                options={preferences}
                selected={option.value ? option.value : null}
                onValueChange={(value) => handleOptionChange(option.name, value,"allergens")}
              />
              </View>
            ))
          )
          : null
        }
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
        width: '100%',
        height: 50,
        borderRadius: borderRadius.L,
    },
    itemForm: {
        flexDirection: 'row', 
        alignItems: 'center', 
        margin: '4%', 
    },
});

export default FoodPreferences;
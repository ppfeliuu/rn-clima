import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Animated,
  Alert,
} from "react-native";
import { Picker } from "@react-native-community/picker";
const Formulario = ({ busqueda, setBusqueda, setConsultar }: any) => {
  const { pais, ciudad } = busqueda;
  const [animacionBoton] = useState(new Animated.Value(1));

  const consultarClima = () => {
    if (pais.trim() === "" || ciudad.trim() === "") {
      mostrarAlerta();
      return;
    }

    setConsultar(true);
  };

  const mostrarAlerta = () => {
    Alert.alert("Error", "Añade una ciudad y país para la busqueda", [
      { text: "OK" },
    ]);
  };

  const animacionIn = () => {
    Animated.spring(animacionBoton, {
      toValue: 0.75,
      friction: 1,
      tension: 30,
      useNativeDriver: false,
    }).start();
  };

  const animacionOut = () => {
    Animated.spring(animacionBoton, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
  };

  const estiloAnimacines = {
    transform: [{ scale: animacionBoton }],
  };

  return (
    <>
      <View>
        <View>
          <TextInput
            value={ciudad}
            style={styles.input}
            placeholder="Ciudad"
            placeholderTextColor="#666"
            onChangeText={(ciudad) => setBusqueda({ ...busqueda, ciudad })}
          />
        </View>
        <View>
          <Picker
            selectedValue={pais}
            itemStyle={{ height: 120, backgroundColor: "#fff" }}
            onValueChange={(pais) => setBusqueda({ ...busqueda, pais })}
          >
            <Picker.Item label="-Selecciones un país-" value="" />
            <Picker.Item label="EE.UU." value="US" />
            <Picker.Item label="México" value="MX" />
            <Picker.Item label="Argentina" value="AR" />
            <Picker.Item label="Colombia" value="CO" />
            <Picker.Item label="Costa Rica" value="CR" />
            <Picker.Item label="España" value="ES" />
            <Picker.Item label="Perú" value="PE" />
          </Picker>
        </View>
        <TouchableWithoutFeedback
          onPressIn={() => animacionIn()}
          onPressOut={() => animacionOut()}
          onPress={() => consultarClima()}
        >
          <Animated.View style={[styles.btnBuscar, estiloAnimacines]}>
            <Text style={styles.textoBuscar}>Buscar</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    height: 50,
    backgroundColor: "#fff",
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  btnBuscar: {
    marginTop: 50,
    backgroundColor: "#000",
    padding: 10,
    justifyContent: "center",
  },
  textoBuscar: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: 18,
  },
});

export default Formulario;

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import Clima from "./components/Clima";
import Formulario from "./components/Formulario";

export default function App() {
  const [busqueda, setBusqueda] = useState({
    ciudad: "",
    pais: "",
  });

  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({});
  const [bgColor, setBgColor] = useState("rgb(71,149,212)");

  const hideTeclado = () => {
    Keyboard.dismiss();
  };

  const { ciudad, pais } = busqueda;
  useEffect(() => {
    const consultarClima = async () => {
      if (consultar) {
        const appId = "42c8c91151673319162c39a43c5e0a48";
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        try {
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
          console.log(resultado);
          setResultado(resultado);
          setConsultar(false);

          //Modificar el bgColor
          const kelvin = 273.15;
          const { main } = resultado;
          const actual = main.temp - kelvin;

          if (actual < 10) {
            setBgColor("rgb(105,108,149)");
          } else if (actual >= 10 && actual < 25) {
            setBgColor("rgb(71,149, 212)");
          } else {
            setBgColor("rgb(178,28,61)");
          }
        } catch (error) {
          mostrarAlerta();
        }
      }
    };

    consultarClima();
  }, [consultar]);

  const bgColorApp = {
    backgroundColor: bgColor,
  };

  const mostrarAlerta = () => {
    Alert.alert("Error", "No hay datos...", [{ text: "OK" }]);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => hideTeclado()}>
        <View style={[styles.app, bgColorApp]}>
          <View style={styles.contenido}>
            <Clima resultado={resultado} />
            <Formulario
              busqueda={busqueda}
              setBusqueda={setBusqueda}
              setConsultar={setConsultar}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "rgb(71, 149, 212)",
    justifyContent: "center",
  },
  contenido: {
    marginHorizontal: "2.5%",
  },
});

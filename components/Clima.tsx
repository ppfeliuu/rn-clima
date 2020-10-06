import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Animated,
  Alert,
  Image,
} from "react-native";

const Clima = ({ resultado }: any) => {
  const { name, main } = resultado;

  if (!name) return null;

  const kelvin = 273.15;

  const temp: any = parseFloat(main.temp).toFixed(2);

  const res = Number(temp - kelvin).toFixed(0);

  return (
    <>
      <View style={styles.clima}>
        <Text style={[styles.texto, styles.actual]}>
          {res}
          <Text style={styles.temperatura}>&#x2103;</Text>
          <Image
            style={{ width: 66, height: 58 }}
            source={{
              uri: `http://openweathermap.org/img/w/${resultado.weather[0].icon}.png`,
            }}
          />
        </Text>
        <View style={styles.temperaturas}>
          <Text style={styles.texto}>
            Min{" "}
            <Text style={styles.temperatura}>
              {Number(main.temp_min - kelvin).toFixed(0)} &#x2103;
            </Text>
          </Text>

          <Text style={styles.texto}>
            Max{" "}
            <Text style={styles.temperatura}>
              {Number(main.temp_max - kelvin).toFixed(0)} &#x2103;
            </Text>
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  clima: {
    marginBottom: 20,
  },
  texto: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    marginRight: 20,
  },
  actual: {
    fontSize: 80,
    marginRight: 0,
    fontWeight: "bold",
  },
  temperatura: {
    fontSize: 24,
    fontWeight: "bold",
  },
  temperaturas: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default Clima;

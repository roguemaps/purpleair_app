import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default class SmallBox extends React.Component {
  calculateColorObject() {
    const { aqi } = this.props;
    switch (true) {
      case aqi <= 50 && aqi >= 0:
        return { color: "black", backgroundColor: "#68E143" };
        break;
      case aqi <= 100 && aqi >= 51:
        return { color: "black", backgroundColor: "#FFFF56" };
        break;
      case aqi <= 150 && aqi >= 101:
        return { color: "black", backgroundColor: "#FFFF56" };
        break;
      case aqi <= 200 && aqi >= 151:
        return { color: "black", backgroundColor: "#FFFF56" };
        break;
      case aqi <= 300 && aqi >= 201:
        return { color: "white", backgroundColor: "#8C1A4B" };
        break;
      case aqi >= 301:
        return { color: "white", backgroundColor: "#8C1A4B" };
        break;
      default:
        return { color: "black", backgroundColor: "#969696" };
    }
  }
  render() {
    const { aqi } = this.props;
    const colorObject = this.calculateColorObject();
    return (
      <View
        style={{
          height: this.props.size || 45,
          width: this.props.size || 45,
          backgroundColor: colorObject.backgroundColor || "#8C1A4B",
          borderColor: colorObject.backgroundColor || "#8C1A4B",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          color: colorObject.color || "black"
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 25 }}>{aqi}</Text>
      </View>
    );
  }
}

// const styles = StyleSheet.create({});

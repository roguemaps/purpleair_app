import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "react-native-elements";
import HeaderSearch from "./header_search";

export default class Appheader extends React.Component {
  render() {
    const { stationName, handleSearch, ...props } = this.props;
    return (
      <Header
        backgroundColor={"#a4a"}
        height={"120px"}
        outerContainerStyles={{
          alignSelf: "stretch",
          height: 100
        }}
        centerComponent={<HeaderSearch handleSearch={handleSearch} />}
        centerContainerStyle={{
          backgroundColor: "white"
        }}
      />
    );
  }
}

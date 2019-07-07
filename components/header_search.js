import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input } from "react-native-elements";

export default class HeaderSearch extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchInput = this.handleSearchInput.bind(this);
  }

  handleSearchInput(value = "") {
    this.props.handleSearch(value);
  }
  render() {
    return (
      <Input
        placeholder={"Enter a Zipcode or City"}
        onChangeText={this.handleSearchInput}
        inputContainerStyle={{
          borderBottomWidth: 0
        }}
      />
    );
  }
}

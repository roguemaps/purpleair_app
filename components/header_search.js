import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, withTheme } from "react-native-elements";

export default class HeaderSearch extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchInput = this.handleSearchInput.bind(this);
  }

  handleSearchInput(value = "") {
    this.props.handleSearch(value);
  }

  renderSearchResults() {
    const {
      placesArray
    } = this.props;
    console.log("placesArray", placesArray)
    // const placesArray = featuresArray.reduce((ar, currentFeature) => {
    //   ar.push(currentFeature.place_name);
    //   return ar;
    // }, []);

    return(
      placesArray.map((place) => {
        <text>{place.place_name}</text>
      })
    );
  }

  render() {
    const {
      placesArray
    } = this.props;
    
    return (
      <>
        <Input
          placeholder={"Enter a Zipcode or City"}
          onChangeText={this.handleSearchInput}
          inputContainerStyle={{
            borderBottomWidth: 0,
            backgroundColor: 'white',
            padding: 5,
          }}
        />
        {placesArray.length > 0 && 
        <scrollView>
          {this.renderSearchResults()}
        </scrollView>}
      </>
    );
  }
}

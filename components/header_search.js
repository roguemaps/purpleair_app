import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, SafeAreaView } from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import { Input, withTheme } from "react-native-elements";


export default function HeaderSearch({placesArray, handleSearch, handleLocationSelect}) {
  const [localSearchValue, changeLocalSearchValue] = useState("");

  const handleSearchInput = (value = "") => {
    changeLocalSearchValue(value);
    handleSearch(value);
  }

  const handleLocationPress = (locCenter) => {
    handleLocationSelect(locCenter);
    changeLocalSearchValue("");
  }

  const renderItem = (place) => {
    return(
      <TouchableOpacity
        style={styles.item}
        onPress={() => handleLocationPress(place.item.center)}
      >
        <Text style={styles.title}>{place.item.place_name}</Text>
      </TouchableOpacity>
    );
  }

    return (
      <SafeAreaView
        style={styles.container}
      >
        <Autocomplete
          data={placesArray}
          placeholder={"Enter a Zipcode or City"}
          defaultValue={localSearchValue}
          onChangeText={text => handleSearchInput(text)}
          renderItem={( place ) => (renderItem(place))}
          style={styles.searchBar}
        />
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 2,
  },
  searchBar: {
    padding: 10,
  },
  item: {
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
    zIndex: 2,
  },
  title: {
    fontSize: 18,
  },
});

  





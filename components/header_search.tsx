import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, SafeAreaView } from "react-native";
import Autocomplete from "react-native-autocomplete-input";

type PlaceObject = {
  id: string;
  short_code: string;
  text: string;
  wikidata: string;
}

type Place = {
  bbox: Array<number>;
  center: Array<number>;
  context: Array<PlaceObject>;
  type: string;
  place_name?: string;
}

type returnPlace = {
  item: Place;
}

// place Object {
//   "index": 0,
//   "item": Object {
//     "bbox": Array [
//       101.613948000072,
//       3.03341438822264,
//       101.758325958617,
//       3.24458099741465,
//     ],
//     "center": Array [
//       101.7,
//       3.15972,
//     ],
//     "context": Array [
//       Object {
//         "id": "country.10264393709009960",
//         "short_code": "my",
//         "text": "Malaysia",
//         "wikidata": "Q833",
//       },
//     ],
//     "geometry": Object {
//       "coordinates": Array [
//         101.7,
//         3.15972,
//       ],
//       "type": "Point",
//     },
//     "id": "place.9922485052747800",
//     "place_name": "Kuala Lumpur, Malaysia",
//     "place_type": Array [
//       "region",
//       "place",
//     ],
//     "properties": Object {
//       "short_code": "MY-14",
//       "wikidata": "Q1865",
//     },
//     "relevance": 1,
//     "text": "Kuala Lumpur",
//     "type": "Feature",
//   },
//   "separators": Object {
//     "highlight": [Function highlight],
//     "unhighlight": [Function unhighlight],
//     "updateProps": [Function updateProps],
//   },
// }

type Props = {
  placesArray: Array<Place>;
  handleSearch: (value: string) => void;
  handleLocationSelect: (locCenter:Array<number>) => void;
}

export default function HeaderSearch({placesArray, handleSearch, handleLocationSelect}:Props) {
  const [localSearchValue, changeLocalSearchValue] = useState("");

  const handleSearchInput = (value:string = "") => {
    changeLocalSearchValue(value);
    handleSearch(value);
  }

  const handleLocationPress = (locCenter:Array<number>) => {
    handleLocationSelect(locCenter);
    changeLocalSearchValue("");
  }

  const renderItem = (place:returnPlace) => {
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
          onChangeText={(text:string )=> handleSearchInput(text)}
          renderItem={( place:any ) => (renderItem(place))}
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

  





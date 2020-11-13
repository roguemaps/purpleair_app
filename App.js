import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import Cardview from "./components/cardview";
import Appheader from "./components/header";
import HeaderSearch from "./components/header_search";
import * as AqiMapping from "./utils/aqi_mapping";

import stubbed from "./stubbed.json";

async function getCurrentLocation() {};


export default function App() {

  const [geolocation, setGeolocation] = useState([]);
  const [fields, setFields] = useState([]);
  const [data, setData] = useState([]);
  const [placesArray, setPlacesArray] = useState([]);
  const [searchRequest, setSearchRequest] = useState("");

  const calculateCurrentAqi = (currentPM) => {
    console.log("currentPM", currentPM);
    return AqiMapping.aqiBplAndBphFromPM(currentPM);
  }

  const storeSearchRequest = (value) => {
    setSearchRequest(value);
  }

  const clearSearchRequest = () => {
    setSearchRequest("");
  }
  // autocomplete=true&types=postcode%2Cplace
  const sendSearchRequest = async () => {
    if(searchRequest.length > 0){
        try {
          let response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchRequest}.json?access_token=pk.eyJ1IjoiamVzc2V2YW5kZXJ3ZXJmIiwiYSI6ImNrZWl2ZG83ZTF5eTEyd3M0bDIxYXBibWYifQ.tvMH-L7xgwtdlOzxnakdCw&autocomplete=true&types=postcode%2Cplace`
          );
          const responseJson = await response.json();
          // console.log(responseJson);
          if(Object.keys(responseJson).length > 0 && responseJson.features && Array.isArray(responseJson.features)){
            setPlacesArray(JSON.parse(JSON.stringify(responseJson.features)));
          } else {
            console.log("here is the responseJson", responseJson);
          }
        } catch (e) {
          console.log("mapbox request errored out", e);
        }
    } else {
      setPlacesArray([]);
    }
  }
  const defaultSearch = `nwlat=42.3123841927021&selat=42.197963909492245&nwlng=-123.31890111806644&selng=-122.53229888193151`
  const fetchSensorDataAsync = async (boundingbox = defaultSearch) => {
    ///needs more work. 
    ///I need to add variable for lat and lng data and I need to get this request to work again. 
    try {
      let response = await fetch(
        `https://www.purpleair.com/data.json?fetch=true&${boundingbox}`
      );
      const responseJson = await response.json();
      // console.log("responseJson", responseJson);
      if (Object.keys(responseJson).length > 0) {
        //handle the response
        // "code": 429,
        // "message": "Rate limit exceeded. Try again in 12767 milli seconds.",
        if(responseJson.code && responseJson.code === parseInt(429, 10)){
          //setstate var to message
          console.log("too many attempts");
        }
        if(responseJson.fields && responseJson.fields.length > 0){
          setFields(JSON.parse(JSON.stringify(responseJson.fields)));
        }
        if(responseJson.data && responseJson.data.length > 0){
          setData(JSON.parse(JSON.stringify(responseJson.data)));
        }
      } else {
        //error handle here (consider launching error pop-over)
        console.log("looks like we did not get a response");
      }
    } catch (e) {
      console.log("there was a fetching error", e);
    }
  }


  const generateBoundingBox = (center) => {
    let searchString = '';
    searchString = searchString.concat(`nwlat=${center[1] + 0.068584192}&`);
    searchString = searchString.concat(`selat=${center[1] - 0.04583609051}&`);
    searchString = searchString.concat(`nwlng=${center[0] - 0.5300011181}&`);
    searchString = searchString.concat(`selng=${center[0] + 0.2566011181}&`);
    return searchString;
  }

  const requestLocationData = (locCenter) => {
    const bbox = generateBoundingBox(locCenter);
    fetchSensorDataAsync(bbox);
    setPlacesArray([]);
    clearSearchRequest();
  };

  useEffect(() => {
    sendSearchRequest();
  }, [searchRequest]);

  const renderCards = ({item}) => {
    const station = item;

    if(fields && fields.length > 0) {
      const labelIndex = fields.indexOf("Label");
      const IDindex = fields.indexOf("ID");

      if(station && station.length > 0) {
          return (
            <Cardview
              key={station[IDindex]}
              stationName={station[labelIndex]}
              currentAqi={aqiObject.aqi}
              oldPMarray={historicalArray}
            />
          );
      } 
    }else {
      return <Text h1>"We have not found any stations!!"</Text>;
    }
  }

  const aqiObject = calculateCurrentAqi(data.length > 0 ? data[0][5]: 0);
  const historicalArray = data.length > 0 ? data[0].slice(5, 10): [];

  return(
    <View style = {styles.container}>
      <Appheader />
      <HeaderSearch 
        handleSearch = {(value) => {storeSearchRequest(value)}}
        handleLocationSelect = {requestLocationData}
        placesArray = {placesArray}
      />
      <SafeAreaView>
        <FlatList
          data={data}
          renderItem={renderCards}
          keyExtractor={(item) => `key - ${item[0]}`}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    alignItems: "center",
    justifyContent: "flex-start"
  },
});

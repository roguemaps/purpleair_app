import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import Cardview from "./components/cardview";
import Appheader from "./components/header";
import HeaderSearch from "./components/header_search";
import * as AqiMapping from "./utils/aqi_mapping";

async function getCurrentLocation() {};


export default function App() {

  const [geolocation, setGeolocation] = useState([]);
  const [fields, setFields] = useState([]);
  const [data, setData] = useState([]);
  const [placesArray, setPlacesArray] = useState([]);
  const [searchRequest, setSearchRequest] = useState("");

  const calculateCurrentAqi = (currentPM) => {
    return AqiMapping.aqiBplAndBphFromPM(currentPM);
  }

  const storeSearchRequest = (value) => {
    setSearchRequest(value);
  }
  // autocomplete=true&types=postcode%2Cplace
  const sendSearchRequest = async () => {
    console.log("value in sendSearchRequest", searchRequest);
    if(searchRequest.length > 0){
        try {
          let response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchRequest}.json?access_token=pk.eyJ1IjoiamVzc2V2YW5kZXJ3ZXJmIiwiYSI6ImNrZWl2ZG83ZTF5eTEyd3M0bDIxYXBibWYifQ.tvMH-L7xgwtdlOzxnakdCw&autocomplete=true&types=postcode%2Cplace`
          );
          const responseJson = await response.json();
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
      console.log("responseJson", responseJson);
      if (Object.keys(responseJson).length > 0) {
        //handle the response
        // "code": 429,
        // "message": "Rate limit exceeded. Try again in 12767 milli seconds.",
        if(responseJson.code && responseJson.code === parseInt(429, 10)){
          //setstate var to message
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
    // console.log("clickity bbox", locCenter);
    const bbox = generateBoundingBox(locCenter);
    fetchSensorDataAsync(bbox);
    setPlacesArray([]);
  }

  // useEffect(() => {
  //   fetchSensorDataAsync();
  // }, []);

  useEffect(() => {
    sendSearchRequest();
  }, [searchRequest]);

  const renderCards = () => {
    if(fields && fields.length > 0){
      const pmIndex = fields.indexOf("pm");
      const labelIndex = fields.indexOf("Label");
      const IDindex = fields.indexOf("ID");
      const pm_0Index = fields.indexOf("pm_0");
      const pm_6Index = fields.indexOf("pm_6");
  
      if(data.length > 0) {
        return data.map((station, index) => {
          const aqiObject = calculateCurrentAqi(station[pmIndex]);
          const historicalArray = station.slice(pm_0Index, pm_6Index);

          return (
            <Cardview
              key={IDindex + "-" + index}
              stationName={station[labelIndex]}
              currentAqi={aqiObject.aqi}
              oldPMarray={historicalArray}
            />
          );
        });
      } 
    }else {
      return <Text h1>"We have not found any stations!!"</Text>;
    }
  }

  return(
    <View style = {styles.container}>
      <Appheader />
      <HeaderSearch 
        handleSearch = {(value) => {storeSearchRequest(value)}}
        handleLocationSelect = {requestLocationData}
        placesArray = {placesArray}
      /> 
      <SafeAreaView style={styles.container}>
        <FlatList style={styles.cards}>{renderCards()}</FlatList> 
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

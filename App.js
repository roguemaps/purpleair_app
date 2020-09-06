import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Cardview from "./components/cardview";
import Appheader from "./components/header";
import HeaderSearch from "./components/header_search";
import { geocodingClient } from "@mapbox/mapbox-sdk";
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

  const sendSearchRequest = async () => {
    console.log("value in sendSearchRequest", searchRequest);
    if(searchRequest.length > 0){
        try {
          let response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchRequest}.json?access_token=pk.eyJ1IjoiamVzc2V2YW5kZXJ3ZXJmIiwiYSI6ImNrZWl2ZG83ZTF5eTEyd3M0bDIxYXBibWYifQ.tvMH-L7xgwtdlOzxnakdCw&autocomplete=true`
          );
          const responseJson = await response.json();
          if(Object.keys(responseJson).length > 0){
            return responseJson.features;
          }
        } catch (e) {
          console.log("mapbox request errored out", e);
        }
    } else {
      return [{
        place_name: "Could not find any results"
      }];
    }
  }

  const fetchSensorDataAsync = async () => {
    ///needs more work. 
    ///I need to add variable for lat and lng data and I need to get this request to work again. 
    try {
      let response = await fetch(
        "https://www.purpleair.com/data.json?fetch=true&nwlat=42.3123841927021&selat=42.197963909492245&nwlng=-123.31890111806644&selng=-122.53229888193151"
      );
      const responseJson = await response.json();
      if (Object.keys(responseJson).length > 0) {
        //handle the response
        //searches => [...searches, query]
        console.log("here is responseJson", responseJson)
        if(responseJson.setFields && responseJson.setFields.length > 0){
          setFields(...fields, responseJson.fields);
        }
        if(responseJson.data && responseJson.data.length > 0){
          setData(...data, responseJson.data);
        }
      } else {
        //error handle here (consider launching error pop-over)
        console.log("looks like we did not get a response");
      }
    } catch (e) {
      console.log("there was a fetching error", e);
    }
  }

  useEffect(() => {
    fetchSensorDataAsync();
  }, []);

  useEffect(() => {
    console.log("I am using the effect");
    sendSearchRequest();
  }, [searchRequest]);

  const renderCards = () => {
    console.log("state value for fields", fields);
    console.log("keys", Object.keys(fields));
    if(fields && fields.length > 0){
      const pmIndex = fields.indexOf("pm");
      const labelIndex = fields.indexOf("Label");
      const IDindex = fields.indexOf("ID");
      const pm_0Index = fields.indexOf("pm_0");
      const pm_6Index = fields.indexOf("pm_6");
      console.log("I'm here and this is data", data);
  
      let count = 0;
      if(data.length > 0) {
        return data.map(station => {
          console.log("station", station);
          const aqiObject = calculateCurrentAqi(station[pmIndex]);
          const historicalArray = station.slice(pm_0Index, pm_6Index);
          count++;
          return (
            <Cardview
              key={IDindex + "-" + count}
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
  // console.log("data", data);
  // console.log("renderCard output", renderCards());

  return(
    <View style = {styles.container}>
      <Appheader />
      <HeaderSearch 
        handleSearch = {(value) => {storeSearchRequest(value)}}
        placesArray = {placesArray}
      /> 
      <ScrollView>{renderCards()}</ScrollView> 
    </View>
  );
}

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       geolocation: [],
//       fields: [],
//       data: [],
//       placesArray: []
//     };
//   }


//   async storeSearchRequest(value = "") {
//     console.log("value", value);
//     // const searchResults = await this.sendSearchRequest(value);
//     // this.setState({placesArray: searchResults});
//     // this.setState({placesArray: this.sendSearchRequest(value)})
//   }

//   


//   componentDidMount() {
//     return this.fetchSensorDataAsync();
//   }

//   render() {
//     const { placesArray } = this.state;
//     return (
      
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    alignItems: "center",
    justifyContent: "flex-start"
  }
});

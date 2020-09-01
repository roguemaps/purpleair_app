import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Cardview from "./components/cardview";
import Appheader from "./components/header";
import { geocodingClient } from "@mapbox/mapbox-sdk";
import * as AqiMapping from "./utils/aqi_mapping";


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      geolocation: [],
      fields: [],
      data: []
    };
  }

  calculateCurrentAqi(currentPM) {
    return AqiMapping.aqiBplAndBphFromPM(currentPM);
  }

  sendSearchRequest(value = "") {
    console.log("value", value);
    geocodingClient.forwardGeocode({
        query: value,
        limit: 10
      })
      .send()
      .then(response => {
        const match = response.body;
        console.log("response", match);
      });
  }

  async getCurrentLocation() {}

  async fetchSensorDataAsync() {
    try {
      let response = await fetch(
        "https://www.purpleair.com/data.json?fetch=true&nwlat=42.3123841927021&selat=42.197963909492245&nwlng=-123.31890111806644&selng=-122.53229888193151"
      );
      const responseJson = await response.json();
      if (responseJson) {
        //handle the response
        this.setState({
          fields: responseJson.fields,
          data: responseJson.data
        });
        const currentPMindex = responseJson.fields.indexOf("pm");
        const talentLabelIndex = responseJson.fields.indexOf("Label");
        const currentPM = responseJson.data[3][currentPMindex];
        console.log("this the station", responseJson.data[3][talentLabelIndex]);
        console.log("this is currentAqi", this.calculateCurrentAqi(currentPM));
      } else {
        //error handle here (consider launching error pop-over)
        console.log("looks like we did not get a response");
      }
    } catch (e) {
      console.log("there was an error", e);
    }
  }

  componentDidMount() {
    return this.fetchSensorDataAsync();
  }

  renderCards() {
    const { data, fields } = this.state;
    const pmIndex = fields.indexOf("pm");
    const labelIndex = fields.indexOf("Label");
    const IDindex = fields.indexOf("ID");
    const pm_0Index = fields.indexOf("pm_0");
    const pm_6Index = fields.indexOf("pm_6");

    let count = 0;
    return data.map(station => {
      const aqiObject = this.calculateCurrentAqi(station[pmIndex]);
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

  render() {
    return (
      <View style={styles.container}>
        <Appheader handleSearch={this.sendSearchRequest} />
        <ScrollView>{this.renderCards()}</ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    alignItems: "center",
    justifyContent: "flex-start"
  }
});

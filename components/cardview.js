import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, Button } from "react-native-elements";
import SmallBox from "./small-box";
import * as AqiMapping from "../utils/aqi_mapping";

export default class Cardview extends React.Component {
  constructor(props) {
    super(props);
  }

  renderSmallCards() {
    const { oldPMarray } = this.props;
    let smallCards = [];
    oldPMarray.forEach(pmVal => {
      const aqiObject = AqiMapping.aqiBplAndBphFromPM(pmVal);
      smallCards.push(<SmallBox key={smallCards.length} aqi={aqiObject.aqi} />);
    });
    return smallCards;
  }

  getDescriptionText() {
    const { currentAqi } = this.props;
    return `${AqiMapping.getAQIDescription(
      currentAqi
    )} - ${AqiMapping.getAQIMessage(currentAqi)}`;
  }

  render() {
    const { stationName, currentAqi } = this.props;
    return (
      <Card containerStyle={styles.cardStyle}>
        <Card.Title>{stationName}</Card.Title>
        <View style={styles.sideBySide}>
          <Text style={{ width: 200 }}>{this.getDescriptionText()}</Text>
          <Text
            style={{
              fontSize: 75,
              fontWeight: "bold"
            }}
          >
            {currentAqi}
          </Text>
        </View>
        <View
          id="box-area"
          style={{
            flex: 0,
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          {this.renderSmallCards()}
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  sideBySide: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10
  },
  cardStyle: {
    width: 350,
    borderWidth: 1,
    borderRadius: 10
  }
});

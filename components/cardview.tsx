import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, Button } from "react-native-elements";
import SmallBox from "./small-box";
import * as AqiMapping from "../utils/aqi_mapping";

type Props = {
  stationName: string;
  currentAqi: number;
  oldPMarray: Array<number>;
}

export default function Cardview({stationName, currentAqi, oldPMarray}:Props) {

  const renderSmallCards = () => {
    let smallCards:Array<React.ReactNode> = [];
    oldPMarray.forEach(pmVal => {
      const aqiObject = AqiMapping.aqiBplAndBphFromPM(pmVal);
      smallCards.push(<SmallBox key={smallCards.length} aqi={aqiObject.aqi} />);
    });
    return smallCards;
  }

  const getDescriptionText = () => {
    return `${AqiMapping.getAQIDescription(
      currentAqi
    )} - ${AqiMapping.getAQIMessage(currentAqi)}`;
  }


  return (
    <Card containerStyle={styles.cardStyle}>
      <Card.Title>{stationName}</Card.Title>
      <View style={styles.sideBySide}>
        <Text style={{ width: 200 }}>{getDescriptionText()}</Text>
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
        style={{
          flex: 0,
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        {renderSmallCards()}
      </View>
    </Card>
  );
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

import React from "react";
import { Text, View } from "react-native";
import { returnAqiColorObject } from '../utils/style_calculations';

type Props = {
    aqi: number;
    size?: number;
}

export default function SmallBox({aqi, size}:Props){
    const colorObject = returnAqiColorObject(aqi);
    return (
        <View
            style={{
            height: size || 45,
            width: size || 45,
            backgroundColor: colorObject.backgroundColor || "#8C1A4B",
            borderColor: colorObject.backgroundColor || "#8C1A4B",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            }}
        >
            <Text style={
                { 
                    fontWeight: "bold", 
                    fontSize: 25, 
                    color: colorObject.color || "black"
                }}>
                {aqi}
                </Text>
        </View>
    );
}

// const styles = StyleSheet.create({});

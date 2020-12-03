import React from "react";
import { View, Animated } from "react-native";
import CloudSvg from "./cloud-svg";

export default function Loading(){
    return (
        <View style={{
            alignItems: "center",
            justifyContent: "center",
            width:"100%",
            height:"86%",
            position: "absolute",
            top: 127,
            zIndex: 2,
        }}>
            <View
                style={{
                    opacity: .25,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "black",
                    width:"100%",
                    height:"100%",
                    position: "absolute",
                    zIndex: 3,
                }}
            >
            </View>
            <View style={{width: 400, height: 400, justifyContent: 'space-around'}}>
                <CloudSvg />
            </View>
        </View>
    );
}

// const styles = StyleSheet.create({});

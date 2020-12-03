import * as React from "react"
import { View } from "react-native";
import Svg, { SvgProps, G, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: style */
//xmlns="http://www.w3.org/2000/svg"

function CloudSvg(props: SvgProps) {
    return (
        <View style={{display: "flex", aspectRatio: 1, paddingLeft: 2 }}>
            <Svg width={"100%"} height={"100%"} viewBox={"0 0 603 352"} {...props}>
                <G id="prefix__layer1" transform="translate(0 -652.362)">
                    <Path
                        d="M293.569 673.818c-18.375 4.25-34.625 11.75-49.75 23.125-16.375 12.375-30.375 30.75-38.375 50.375-2.25 5.375-4.375 10.125-4.625 10.5-.375.375-4.875-.875-10.125-2.625-11-3.625-27.25-4.25-38.25-1.25-15.75 4.125-30.125 14.25-39.25 27.625-7.5 11-11.125 21.125-11.875 33.25l-.625 9.625-9.5 3.25c-31 10.25-56 36.125-66.375 68.75-4.25 13.5-5 39-1.375 53.125 9.25 36.5 36.25 65.125 71.875 76.125 16.125 5 29.75 5.25 207.625 4.75 187.125-.5 173.75.125 197-8.375 31.625-11.375 59.75-39.5 71.125-71 5.625-15.75 7.5-26.125 7.5-42.75 0-33.625-11.75-61.875-35.5-85.75-24.75-24.625-54-36.375-88.25-35.25l-15.875.5-1.5-10.625c-7.125-49.625-41.375-88.125-90.875-102.125-9.625-2.75-43.25-3.5-53-1.25z"
                        id="prefix__path3033"
                        fill="none"
                        stroke="#a4a"
                        strokeWidth={40}
                        strokeLinecap="square"
                        strokeLinejoin="round"
                        strokeMiterlimit={4}
                        strokeOpacity={1}
                        strokeDasharray="none"
                    />
                </G>
            </Svg>
        </View>
    )
}

export default CloudSvg
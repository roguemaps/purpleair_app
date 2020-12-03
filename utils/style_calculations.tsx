type returnObj = {
    color: StyleProp<ViewStyle>;
    backgroundColor: string;
}

export function returnAqiColorObject(aqi: number):returnObj {
    switch (true) {
    case aqi <= 50 && aqi >= 0:
        return { color: "black", backgroundColor: "#68E143" };
        break;
    case aqi <= 100 && aqi >= 51:
        return { color: "black", backgroundColor: "#FFFF56" };
        break;
    case aqi <= 150 && aqi >= 101:
        return { color: "black", backgroundColor: "#FFFF56" };
        break;
    case aqi <= 200 && aqi >= 151:
        return { color: "black", backgroundColor: "#FFFF56" };
        break;
    case aqi <= 300 && aqi >= 201:
        return { color: "white", backgroundColor: "#8C1A4B" };
        break;
    case aqi >= 301:
        return { color: "white", backgroundColor: "#8C1A4B" };
        break;
    default:
        return { color: "black", backgroundColor: "#969696" };
    }
}
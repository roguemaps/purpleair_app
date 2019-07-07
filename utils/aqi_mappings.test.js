import * as AqiMapping from "./aqi_mapping.js";

describe("aqiFromPM", () => {
  it("should return - if pm is NaN", () => {
    const mapping = AqiMapping.aqiBplAndBphFromPM("not a number");
    expect(mapping).toEqual({ aqi: "-", bph: "-", bpl: "-" });
  });

  it("should return - if pm is undefined or > 1000", () => {
    let locPm;
    const mapping = AqiMapping.aqiBplAndBphFromPM(locPm);
    expect(mapping).toEqual({ aqi: "-", bph: "-", bpl: "-" });
    const newPm = 1001;
    const newMapping = AqiMapping.aqiBplAndBphFromPM(newPm);
    expect(newMapping).toEqual({ aqi: "-", bph: "-", bpl: "-" });
  });

  it("should return pm and 0s if pm < 0 ", () => {
    const locPm = -1;
    const mapping = AqiMapping.aqiBplAndBphFromPM(locPm);
    expect(mapping).toEqual({ aqi: locPm, bph: 0, bpl: 0 });
  });

  it("should return # if pm > 350.5 but pm < 1000 ", () => {
    const locPm = 350.6;
    const mapping = AqiMapping.aqiBplAndBphFromPM(locPm);
    const testValue = AqiMapping.calcAQI(locPm, 500, 401, 500, 350.5);
    expect(mapping).toEqual({ aqi: testValue, bpl: 401, bph: 500 });
  });

  it("should return # if pm > 250.5 but pm < 350.5 ", () => {
    //min
    const locPm = 250.6;
    const mapping = AqiMapping.aqiBplAndBphFromPM(locPm);
    const testValue = AqiMapping.calcAQI(locPm, 400, 301, 350.4, 250.5);
    expect(mapping).toEqual({ aqi: testValue, bpl: 301, bph: 500 });
    //max
    const locPmMax = 350.4;
    const mappingMax = AqiMapping.aqiBplAndBphFromPM(locPmMax);
    const testValueMax = AqiMapping.calcAQI(locPmMax, 400, 301, 350.4, 250.5);
    expect(mappingMax).toEqual({ aqi: testValueMax, bpl: 301, bph: 500 });
  });

  it("should return # if pm > 150.5 but pm < 250.5 ", () => {
    //min
    const locPm = 150.6;
    const mapping = AqiMapping.aqiBplAndBphFromPM(locPm);
    const testValue = AqiMapping.calcAQI(locPm, 300, 201, 250.4, 150.5);
    expect(mapping).toEqual({ aqi: testValue, bpl: 201, bph: 300 });
    //max
    const locPmMax = 250.4;
    const mappingMax = AqiMapping.aqiBplAndBphFromPM(locPmMax);
    const testValueMax = AqiMapping.calcAQI(locPmMax, 300, 201, 250.4, 150.5);
    expect(mappingMax).toEqual({ aqi: testValueMax, bpl: 201, bph: 300 });
  });

  it("should return # if pm > 55.5 but pm < 150.5 ", () => {
    //min
    const locPm = 55.6;
    const mapping = AqiMapping.aqiBplAndBphFromPM(locPm);
    const testValue = AqiMapping.calcAQI(locPm, 200, 151, 150.4, 55.5);
    expect(mapping).toEqual({ aqi: testValue, bpl: 151, bph: 200 });
    //max
    const locPmMax = 150.4;
    const mappingMax = AqiMapping.aqiBplAndBphFromPM(locPmMax);
    const testValueMax = AqiMapping.calcAQI(locPmMax, 200, 151, 150.4, 55.5);
    expect(mappingMax).toEqual({ aqi: testValueMax, bpl: 151, bph: 200 });
  });

  it("should return # if pm > 35.5 but pm < 55.5 ", () => {
    //min
    const locPm = 35.6;
    const mapping = AqiMapping.aqiBplAndBphFromPM(locPm);
    const testValue = AqiMapping.calcAQI(locPm, 150, 101, 55.4, 35.5);
    expect(mapping).toEqual({ aqi: testValue, bpl: 101, bph: 150 });
    //max
    const locPmMax = 55.4;
    const mappingMax = AqiMapping.aqiBplAndBphFromPM(locPmMax);
    const testValueMax = AqiMapping.calcAQI(locPmMax, 150, 101, 55.4, 35.5);
    expect(mappingMax).toEqual({ aqi: testValueMax, bpl: 101, bph: 150 });
  });

  it("should return # if pm > 12.1 but pm < 35.5 ", () => {
    //min
    const locPm = 12.2;
    const mapping = AqiMapping.aqiBplAndBphFromPM(locPm);
    const testValue = AqiMapping.calcAQI(locPm, 100, 51, 35.4, 12.1);
    expect(mapping).toEqual({ aqi: testValue, bpl: 51, bph: 100 });
    //max
    const locPmMax = 35.4;
    const mappingMax = AqiMapping.aqiBplAndBphFromPM(locPmMax);
    const testValueMax = AqiMapping.calcAQI(locPmMax, 100, 51, 35.4, 12.1);
    expect(mappingMax).toEqual({ aqi: testValueMax, bpl: 51, bph: 100 });
  });

  it("should return # if pm >= 0 but pm < 12.1 ", () => {
    //min
    const locPm = 0;
    const mapping = AqiMapping.aqiBplAndBphFromPM(locPm);
    const testValue = AqiMapping.calcAQI(locPm, 50, 0, 12, 0);
    expect(mapping).toEqual({ aqi: testValue, bpl: 0, bph: 0 });
    //max
    const locPmMax = 12.2;
    const mappingMax = AqiMapping.aqiBplAndBphFromPM(locPmMax);
    const testValueMax = AqiMapping.calcAQI(locPmMax, 50, 0, 12, 0);
    expect(mappingMax).toEqual({ aqi: testValueMax, bpl: 0, bph: 0 });
  });

  //test of parsing pm values from a sensor
  it.only("should return an aqi of 42 ", () => {
    const locPm = 10;
    const mapping = AqiMapping.aqiBplAndBphFromPM(locPm);
    expect(mapping.aqi).toEqual(42);
  });
});

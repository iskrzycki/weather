import { Measurement } from "./App";

type Trend = "UP" | "DOWN";

export interface currentData {
  current: number;
  min: number;
  max: number;
  trend: Trend;
  time: string;
}

export interface currentTempData extends currentData {
  dewPoint: number;
}

export interface WeatherData {
  pressure?: currentData;
  temperature?: currentTempData;
  humidity?: currentData;
  measurements: Measurement[];
}

export const emptyObj: WeatherData = {
  pressure: undefined,
  humidity: undefined,
  temperature: undefined,
  measurements: [],
};

const desiredStepBack = 4; // TODO consider moving to config

export const calculate = (data: Measurement[]): WeatherData => {
  if (data.length === 0) return emptyObj;

  const last = data[data.length - 1];
  const pressures = data.map((x) => x.press);
  const temperatures = data.map((x) => x.temp);
  const humidities = data.map((x) => x.hum);

  const stepsBack =
    data.length >= desiredStepBack ? desiredStepBack : data.length;

  return {
    pressure: {
      current: last.press,
      min: Math.min(...pressures),
      max: Math.max(...pressures),
      trend: getTrend(last.press, pressures, stepsBack),
      time: last.time,
    },
    humidity: {
      current: last.hum,
      min: Math.min(...humidities),
      max: Math.max(...humidities),
      trend: getTrend(last.hum, humidities, stepsBack),
      time: last.time,
    },
    temperature: {
      current: last.temp,
      min: Math.min(...temperatures),
      max: Math.max(...temperatures),
      dewPoint: getDewPoint(last.hum, last.temp),
      trend: getTrend(last.temp, temperatures, stepsBack),
      time: last.time,
    },
    measurements: data,
  };
};

const getTrend = (current: number, all: number[], stepsBack: number): Trend => {
  return current > all[all.length - stepsBack] ? "UP" : "DOWN";
};

const getDewPoint = (hum: number, temp: number) =>
  Math.round(
    (Math.pow(hum / 100, 1 / 8) * (112 + 0.9 * temp) + 0.1 * temp - 112) * 100
  ) / 100;

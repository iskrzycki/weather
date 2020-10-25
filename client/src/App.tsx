import { Container, Grid, Paper } from "@material-ui/core";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import Chart, { seriesBuilder } from "./components/Chart/Chart";
import MeasurementBox from "./components/MeasurementBox/MeasurementBox";
import "./App.css";
import { calculate, emptyObj, WeatherData } from "./weatherService";

export interface Measurement {
  hum: number;
  press: number;
  temp: number;
  time: string;
}

const chartSeries = [
  seriesBuilder("time", "temp", "{temp}", "Temperature", "℃"),
  seriesBuilder("time", "hum", "{hum}", "Humidity"),
  seriesBuilder("time", "press", "{press}", "Pressure", "hPa"),
];

const App = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>(emptyObj);
  const [period, setPeriod] = useState<Number>(1);

  useEffect(() => {
    setWeatherData(emptyObj);
    fetch(`http://weather.iskrzycki.usermd.net/api/getLastXDays/${period}`)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(calculate(data.data));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [period]);

  return (
    <div className="App">
      <>
        <header className="App-header">
          WEATHER STATION
          <br />
          ŁÓDŹ, POLAND
        </header>

        <Container maxWidth={"md"} style={{ marginTop: "20px" }}>
          <Grid container spacing={3} justify="space-between">
            <Grid item sm={4} xs={12}>
              <MeasurementBox
                title="Temperature"
                value={weatherData.temperature}
                unit="°C"
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <MeasurementBox
                title="Pressure"
                value={weatherData.pressure}
                unit="hPa"
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <MeasurementBox
                title="Humidity"
                value={weatherData.humidity}
                unit="%"
              />
            </Grid>
          </Grid>
        </Container>

        <Container maxWidth={false} style={{ marginTop: "20px" }}>
          <ToggleButtonGroup
            value={period}
            exclusive
            onChange={(e, val) => setPeriod(val)}
            aria-label="period"
            style={{ marginBottom: "20px" }}
          >
            <ToggleButton value={1} aria-label="1 day" disabled={period === 1}>
              24h
            </ToggleButton>
            <ToggleButton value={7} aria-label="7 days" disabled={period === 7}>
              7 days
            </ToggleButton>
            <ToggleButton
              value={30}
              aria-label="30 days"
              disabled={period === 30}
            >
              30 days
            </ToggleButton>
            <ToggleButton
              value={50000}
              aria-label="max"
              disabled={period === 50000}
            >
              max
            </ToggleButton>
          </ToggleButtonGroup>

          <Grid container spacing={2}>
            <Grid item lg={4} xs={12}>
              <Paper>
                <Chart
                  data={weatherData.measurements}
                  series={chartSeries[0]}
                />
              </Paper>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Paper>
                <Chart
                  data={weatherData.measurements}
                  series={chartSeries[1]}
                />
              </Paper>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Paper>
                <Chart
                  data={weatherData.measurements}
                  series={chartSeries[2]}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </>
    </div>
  );
};

export default App;

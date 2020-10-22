import { Container, Grid, Paper } from "@material-ui/core";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import Chart, { seriesBuilder } from "./components/Chart/Chart";
import MeasurementBox from "./components/MeasurementBox/MeasurementBox";
import "./App.css";

interface WeatherRequestData {
  data: {
    hum: Number;
    press: Number;
    temp: Number;
    time: string;
  }[];
  loading: boolean;
}

const chartSeries = [
  seriesBuilder("time", "temp", "{temp}", "Temperature", "℃"),
  seriesBuilder("time", "hum", "{hum}", "Humidity"),
  seriesBuilder("time", "press", "{press}", "Pressure", "hPa"),
];

const App = () => {
  const [requestData, setRequestData] = useState<WeatherRequestData>({
    data: [],
    loading: true,
  });
  const [period, setPeriod] = useState<Number>(1);

  useEffect(() => {
    setRequestData({ data: [], loading: true });
    fetch(`http://weather.iskrzycki.usermd.net/api/getLastXDays/${period}`)
      .then((response) => response.json())
      .then((data) => {
        setRequestData({ data: data.data, loading: false });
      })
      .catch((error) => {
        console.error(error);
        setRequestData({ ...requestData, loading: false });
      });
  }, [period]);

  const last =
    requestData.data.length > 0
      ? requestData.data[requestData.data.length - 1]
      : undefined;

  // TODO move devPoint to separate service.
  const dewPoint = (hum: number, temp: number) =>
    Math.pow(hum / 100, 1 / 8) * (112 + 0.9 * temp) + 0.1 * temp - 112;

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
                value={last ? last.temp : undefined}
                valueMax={"-"}
                valueMin={"-"}
                unit="°C"
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <MeasurementBox
                title="Pressure"
                value={last ? last.press : undefined}
                valueMax={"-"}
                valueMin={"-"}
                unit="hPa"
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <MeasurementBox
                title="Humidity"
                value={last ? last.hum : undefined}
                valueMax={"-"}
                valueMin={"-"}
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
                <Chart data={requestData.data} series={chartSeries[0]} />
              </Paper>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Paper>
                <Chart data={requestData.data} series={chartSeries[1]} />
              </Paper>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Paper>
                <Chart data={requestData.data} series={chartSeries[2]} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </>
    </div>
  );
};

export default App;

import { CircularProgress, Container, Grid, Paper } from "@material-ui/core";
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
  const isDataReady = requestData.data.length > 0 && !requestData.loading;

  return (
    <div className="App">
      <>
        <header className="App-header">
          {isDataReady ? (
            <div style={{ display: "flex" }}>
              <MeasurementBox title="Temperature" value={last!.temp} />
              <MeasurementBox title="Pressure" value={last!.press} />
              <MeasurementBox title="Humidity" value={last!.hum} />
            </div>
          ) : (
            <CircularProgress />
          )}
        </header>
        <Container maxWidth={false} style={{ marginTop: "20px" }}>
          <ToggleButtonGroup
            value={period}
            exclusive
            onChange={(e, val) => setPeriod(val)}
            aria-label="period"
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

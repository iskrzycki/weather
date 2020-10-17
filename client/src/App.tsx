import { Container, Grid, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Chart, { seriesBuilder } from "./components/Chart/Chart";
import MeasurementBox from "./components/MeasurementBox/MeasurementBox";
import "./App.css";

interface WeatherData {
  hum: Number;
  press: Number;
  temp: Number;
  time: string;
}

const App = () => {
  const [measurements, setMeasurements] = useState<WeatherData[]>([]);

  useEffect(() => {
    // fetch("http://localhost:7256/api/getLastXDays/1")
    fetch("http://weather.iskrzycki.usermd.net/api/getLastXDays/1")
      .then((response) => response.json())
      .then((data) => {
        setMeasurements(data.data);
      });
  }, []);

  const chartSeries = [
    seriesBuilder("time", "temp", "{temp}", "Temperature", "℃"),
    seriesBuilder("time", "hum", "{hum}", "Humidity"),
    seriesBuilder("time", "press", "{press}", "Pressure", "hPa"),
  ];

  const last = measurements[measurements.length - 1];

  return (
    <div className="App">
      {measurements.length > 0 ? (
        <>
          <header className="App-header">
            <div style={{ display: "flex" }}>
              <MeasurementBox title="Temperature" value={last.temp} />
              <MeasurementBox title="Pressure" value={last.press} />
              <MeasurementBox title="Humidity" value={last.hum} />
            </div>
          </header>
          <Container maxWidth={false} style={{ marginTop: "20px" }}>
            <Grid container spacing={2}>
              <Grid item lg={4} xs={12}>
                <Paper>
                  <Chart data={measurements} series={chartSeries[0]} />
                </Paper>
              </Grid>
              <Grid item lg={4} xs={12}>
                <Paper>
                  <Chart data={measurements} series={chartSeries[1]} />
                </Paper>
              </Grid>
              <Grid item lg={4} xs={12}>
                <Paper>
                  <Chart data={measurements} series={chartSeries[2]} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </>
      ) : (
        "LOADING..."
      )}
    </div>
  );
};

export default App;

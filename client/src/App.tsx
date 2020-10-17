import { Container, Grid, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Chart, { seriesBuilder } from "./components/Chart/Chart";
import MeasurementBox from "./components/MeasurementBox/MeasurementBox";
import "./App.css";

const App = () => {
  const [lastMeasurements, setLastMeasurements] = useState({
    temperature: "",
    humidity: "",
    pressure: "",
  });

  const [measurements, setMeasurements] = useState([]);

  useEffect(() => {
    fetch("http://weather.iskrzycki.usermd.net/api/getLast")
      .then((response) => response.json())
      .then((data) => {
        setLastMeasurements(data);
      });

    fetch("http://localhost:7256/api/getLastWeek")
      .then((response) => response.json())
      .then((data) => {
        console.log("setMeasurements ", data);
        setMeasurements(data.data);
      });
  }, []);

  const chartSeries = [
    seriesBuilder("createdAt", "temp2", "{temp2}", "Temperature", "℃"),
    seriesBuilder("createdAt", "hum2", "{hum2}", "Humidity"),
    seriesBuilder(
      "createdAt",
      "absolutePressure",
      "{absolutePressure}",
      "Pressure",
      "hPa"
    ),
  ];

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: "flex" }}>
          <MeasurementBox
            title="Temperature"
            value={lastMeasurements.temperature}
          />
          <MeasurementBox title="Pressure" value={lastMeasurements.pressure} />
          <MeasurementBox title="Humidity" value={lastMeasurements.humidity} />
        </div>
      </header>
      {measurements.length > 0 ? (
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
      ) : (
        "LOADING..."
      )}
    </div>
  );
};

export default App;

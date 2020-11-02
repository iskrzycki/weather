import { Container, Grid, Paper } from "@material-ui/core";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import Chart, { seriesBuilder } from "./components/Chart/Chart";
import MeasurementBox from "./components/MeasurementBox/MeasurementBox";
import { calculate, emptyObj, WeatherData } from "./weatherService";
import { getData } from "./api";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./components/LanguageSwitcher";
import "./App.css";

export interface Measurement {
  hum: number;
  press: number;
  temp: number;
  time: string;
}

const App = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>(emptyObj);
  const [period, setPeriod] = useState<number>(1);
  const { t } = useTranslation();

  const chartSeries = [
    seriesBuilder("time", "temp", "{temp}", t("charts.temp"), "℃"),
    seriesBuilder("time", "hum", "{hum}", t("charts.hum")),
    seriesBuilder("time", "press", "{press}", t("charts.press"), "hPa"),
  ];

  useEffect(() => {
    setWeatherData(emptyObj);
    getData(period).then((data) => {
      setWeatherData(calculate(data));
    });
  }, [period]);

  return (
    <div className="App">
      <>
        <header className="App-header">
          <Container maxWidth={"md"}>
            <Grid container spacing={3} justify="space-between">
              <Grid item sm={2} xs={12}></Grid>
              <Grid item sm={8} xs={12}>
                {t("title")}
                <br />
                {t("location")}
              </Grid>
              <Grid item sm={2} xs={12}>
                <LanguageSwitcher />
              </Grid>
            </Grid>
          </Container>
        </header>

        <Container maxWidth={"md"} style={{ marginTop: "20px" }}>
          <Grid container spacing={3} justify="space-between">
            <Grid item sm={4} xs={12}>
              <MeasurementBox
                title={t("tiles.temp")}
                value={weatherData.temperature}
                unit="°C"
                icon="temperature"
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <MeasurementBox
                title={t("tiles.press")}
                value={weatherData.pressure}
                unit="hPa"
                icon="pressure"
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <MeasurementBox
                title={t("tiles.hum")}
                value={weatherData.humidity}
                unit="%"
                icon="humidity"
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
            <ToggleButton
              value={1}
              aria-label={t("periods.24h")}
              disabled={period === 1}
            >
              {t("periods.24h")}
            </ToggleButton>
            <ToggleButton
              value={7}
              aria-label={t("periods.7days")}
              disabled={period === 7}
            >
              {t("periods.7days")}
            </ToggleButton>
            <ToggleButton
              value={30}
              aria-label={t("periods.30days")}
              disabled={period === 30}
            >
              {t("periods.30days")}
            </ToggleButton>
            <ToggleButton
              value={50000}
              aria-label={t("periods.max")}
              disabled={period === 50000}
            >
              {t("periods.max")}
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

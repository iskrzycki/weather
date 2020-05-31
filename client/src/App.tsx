import React, { useEffect, useState } from "react";
import "./App.css";
import MeasurementBox from "./components/MeasurementBox/MeasurementBox";

const App = () => {
  const [lastMeasurements, setLastMeasurements] = useState({
    temperature: "",
    humidity: "",
    pressure: "",
  });

  const [measurements, setMeasurements] = useState([]);

  useEffect(() => {
    // fetch("/api/getLast")
    fetch("http://weather.iskrzycki.usermd.net/api/getLast")
      .then((response) => response.json())
      .then((data) => {
        setLastMeasurements(data);
      });

    fetch("http://weather.iskrzycki.usermd.net/api/getData")
      .then((response) => response.json())
      .then((data) => {
        console.log("setMeasurements ", data);
        setMeasurements(data.data);
      });
  }, []);

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
        {measurements.length > 0
          ? `Loaded ${measurements.length}`
          : "LOADING..."}
      </header>
    </div>
  );
};

export default App;

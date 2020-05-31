(() => {
  const temperatureElem = document.getElementById("temperature");
  const pressureElem = document.getElementById("pressure");
  const humidityElem = document.getElementById("humidity");

  fetch("/api/getLast")
    .then((response) => response.json())
    .then((data) => {
      temperatureElem.textContent = data.temperature;
      pressureElem.textContent = data.pressure;
      humidityElem.textContent = data.humidity;
    });
})();

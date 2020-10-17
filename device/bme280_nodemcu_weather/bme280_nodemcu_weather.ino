#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>
#include "DHT.h"
#define DHTTYPE DHT22

uint8_t DHTPin = D6;
DHT dht(DHTPin, DHTTYPE);

Adafruit_BME280 bme;
HTTPClient http;

float temperature, humidity, pressure, altitude;
float DHT_temperature, DHT_humidity;

void setup()
{
  Serial.begin(115200);
  Serial.println();
  Serial.print("connecting...");
  WiFi.mode(WIFI_STA);
  WiFi.begin("SSID", "PASSWORD");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  // DHT config
  pinMode(DHTPin, INPUT);

  dht.begin();

  // BME CONFIG
  bme.begin(0x76);
  bme.setSampling(Adafruit_BME280::MODE_FORCED,
                  Adafruit_BME280::SAMPLING_X1, // temperature
                  Adafruit_BME280::SAMPLING_X1, // pressure
                  Adafruit_BME280::SAMPLING_X1, // humidity
                  Adafruit_BME280::FILTER_OFF);
}

void loop()
{
  if (WiFi.status() == WL_CONNECTED)
  {
    http.begin("http://path.to.api/method");
    http.addHeader("Content-Type", "application/json");

    // DATA READ SECTION
    bme.takeForcedMeasurement();
    temperature = bme.readTemperature();
    humidity = bme.readHumidity();
    pressure = bme.readPressure() / 100.0F;

    DHT_temperature = dht.readTemperature();
    DHT_humidity = dht.readHumidity();

    int httpResponseCode = http.POST("{\"temp1\":\"" + String(temperature) + "\",\"pressure\":\"" + String(pressure) + "\",\"hum1\":\"" + String(humidity) + "\",\"temp2\":\"" + String(DHT_temperature) + "\",\"hum2\":\"" + String(DHT_humidity) + "\"}");

    http.end();
  }
  else
  {
    Serial.println("Error in WiFi connection");
  }

  delay(60000); // Send a request every 60 seconds
}

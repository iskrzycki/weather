import { Measurement } from "./App";

const ENDPOINT = "http://weather.iskrzycki.usermd.net/api";

export const getData = (numOfDays: number): Promise<Measurement[]> =>
  fetch(`${ENDPOINT}/getLastXDays/${numOfDays}`)
    .then((response) => response.json())
    .then((json) => json.data);

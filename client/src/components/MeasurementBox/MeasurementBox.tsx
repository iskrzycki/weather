import React from "react";
import "./MeasurementBox.css";

interface MeasurementBoxProps {
  title: string;
  value: string | Number;
}

const MeasurementBox = (props: MeasurementBoxProps) => (
  <div className="measurement-box">
    <p>{props.title}</p>
    <p>{props.value}</p>
  </div>
);

export default MeasurementBox;

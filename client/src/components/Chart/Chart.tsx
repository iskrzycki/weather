import React, { useEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import "./Chart.css";

am4core.useTheme(am4themes_animated);

interface ChartProps {
  data: any[];
  series: am4charts.XYSeries | am4charts.XYSeries[];
}

export const seriesBuilder = (
  x: string,
  y: string,
  tooltip: string,
  name: string,
  unit?: string
): am4charts.XYSeries => {
  const elem = new am4charts.LineSeries();
  elem.dataFields.dateX = x;
  elem.dataFields.valueY = y;
  elem.tooltipText = `[bold]${name}:[/] ${tooltip} ${unit ? unit : ""}`;
  elem.name = name;

  return elem;
};

const Chart = (props: ChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let chart = am4core.create(
      chartRef.current as HTMLElement,
      am4charts.XYChart
    );

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.tooltipDateFormat = "dd-MM-yyyy HH:mm";

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.cursorTooltipEnabled = false;

    if (Array.isArray(props.series)) {
      props.series.forEach((serie) => {
        chart.series.push(serie);
      });
    } else {
      chart.series.push(props.series);
    }

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineY.disabled = true;

    chart.dateFormatter.inputDateFormat = "i"; // ISO 8061
    chart.dateFormatter.dateFormat = "yyyy-MM-dd";
    chart.legend = new am4charts.Legend();

    chart.data = props.data;
  }, []);

  return (
    <div
      className="chart"
      ref={chartRef}
      style={{ width: "100%", height: "400px" }}
    ></div>
  );
};

export default Chart;

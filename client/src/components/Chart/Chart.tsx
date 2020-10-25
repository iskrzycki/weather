import React, { useEffect, useRef, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
am4core.options.autoDispose = true;

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
  const [chart, setChart] = useState<am4charts.XYChart>();

  useEffect(() => {
    const newChart = am4core.create(
      chartRef.current as HTMLElement,
      am4charts.XYChart
    );
    setChart(newChart);

    let dateAxis = newChart.xAxes.push(new am4charts.DateAxis());
    dateAxis.tooltipDateFormat = "dd-MM-yyyy HH:mm";

    let valueAxis = newChart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.cursorTooltipEnabled = false;

    if (Array.isArray(props.series)) {
      props.series.forEach((serie) => {
        newChart.series.push(serie);
      });
    } else {
      newChart.series.push(props.series);
    }

    newChart.cursor = new am4charts.XYCursor();
    newChart.cursor.lineY.disabled = true;

    newChart.dateFormatter.inputDateFormat = "i"; // ISO 8061
    newChart.dateFormatter.dateFormat = "yyyy-MM-dd";
    newChart.legend = new am4charts.Legend();

    setChart(newChart);
  }, [props.series]);

  useEffect(() => {
    if (chart) {
      chart.data = props.data;
    }
  }, [chart, props.data]);

  return (
    <div
      className="chart"
      ref={chartRef}
      style={{ width: "100%", height: "400px" }}
    ></div>
  );
};

export default Chart;

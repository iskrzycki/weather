import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  makeStyles,
  Typography,
  Box,
} from "@material-ui/core";
import React from "react";
import { grey, red, green } from "@material-ui/core/colors";
import { currentData, currentTempData } from "../../weatherService";
import { format } from "date-fns";
import { Trend } from "../../weatherService";

type WeatherDataType = "Temperature" | "Pressure" | "Humidity";

interface MeasurementBoxProps {
  title: WeatherDataType;
  value?: currentData | currentTempData;
  unit: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
  },
  avatar: {
    backgroundColor: grey[300],
  },
  cardContent: {
    height: 80,
  },
  bold: {
    fontWeight: "bold",
  },
  arrowUp: {
    color: green[500],
  },
  arrowDown: {
    color: red[500],
  },
}));

const MeasurementBox = ({ title, value, unit }: MeasurementBoxProps) => {
  const classes = useStyles();

  const renderTextValuePair = (
    text: string,
    value: string,
    icon?: JSX.Element
  ): JSX.Element => (
    <Box>
      <Typography
        className={classes.bold}
        color="textSecondary"
        component="span"
      >
        {`${text}: `}
      </Typography>
      <Typography color="textSecondary" component="span">
        {value} {icon}
      </Typography>
    </Box>
  );

  const getTrendIcon = (trend: Trend): JSX.Element => {
    switch (trend) {
      case "UP":
        return <span className={classes.arrowUp}>&#9650;</span>;
      case "DOWN":
        return <span className={classes.arrowDown}>&#9660;</span>;
    }
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src={`/icons/${title.toLowerCase()}.png`}
          />
        }
        title={title}
        subheader={
          value ? format(new Date(value.time), "yyyy-MM-dd HH:mm") : ""
        }
      />
      <CardContent className={classes.cardContent}>
        {value ? (
          <>
            {renderTextValuePair(
              "Current",
              `${value.current} ${unit}`,
              getTrendIcon(value.trend)
            )}
            {renderTextValuePair("Max", `${value.max} ${unit}`)}
            {renderTextValuePair("Min", `${value.min} ${unit}`)}
            {(value as currentTempData).dewPoint
              ? renderTextValuePair(
                  "Dew Point",
                  `${(value as currentTempData).dewPoint} ${unit}`
                )
              : null}
          </>
        ) : (
          <CircularProgress />
        )}
      </CardContent>
    </Card>
  );
};

export default MeasurementBox;

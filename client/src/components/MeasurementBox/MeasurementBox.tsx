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
import { useTranslation } from "react-i18next";

type WeatherDataType = "Temperature" | "Pressure" | "Humidity";

interface MeasurementBoxProps {
  title: WeatherDataType;
  value?: currentData | currentTempData;
  unit: string;
  icon: string;
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

const MeasurementBox = ({ title, value, unit, icon }: MeasurementBoxProps) => {
  const classes = useStyles();
  const { t } = useTranslation();

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
            src={`/icons/${icon}.png`}
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
              t("tiles.current"),
              `${value.current} ${unit}`,
              getTrendIcon(value.trend)
            )}
            {renderTextValuePair(t("tiles.max"), `${value.max} ${unit}`)}
            {renderTextValuePair(t("tiles.min"), `${value.min} ${unit}`)}
            {(value as currentTempData).dewPoint
              ? renderTextValuePair(
                  t("tiles.dew-point"),
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

import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { grey } from "@material-ui/core/colors";
import { currentData, currentTempData } from "../../weatherService";
import { format } from "date-fns";

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
}));

const MeasurementBox = ({ title, value, unit }: MeasurementBoxProps) => {
  const classes = useStyles();

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
            <Typography variant="body2" color="textSecondary" component="p">
              {`Current: ${value.current} ${unit}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {`MAX: ${value.max} ${unit}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {`MIN: ${value.min} ${unit}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {`TREND: ${value.trend}`}
            </Typography>
            {(value as currentTempData).dewPoint ? (
              <Typography variant="body2" color="textSecondary" component="p">
                {`DEW POINT: ${(value as currentTempData).dewPoint} ${unit}`}
              </Typography>
            ) : null}
          </>
        ) : (
          <CircularProgress />
        )}
      </CardContent>
    </Card>
  );
};

export default MeasurementBox;

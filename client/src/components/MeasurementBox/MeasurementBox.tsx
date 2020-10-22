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

type WeatherDataType = "Temperature" | "Pressure" | "Humidity";

interface MeasurementBoxProps {
  title: WeatherDataType;
  value?: string | Number;
  valueMax?: string | Number;
  valueMin?: string | Number;
  unit: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 250,
    textAlign: "left",
  },
  avatar: {
    backgroundColor: grey[300],
  },
  cardContent: {
    height: 70,
  },
}));

const MeasurementBox = ({
  title,
  value,
  valueMax,
  valueMin,
  unit,
}: MeasurementBoxProps) => {
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
        subheader="18:20 22.10.2020"
      />
      <CardContent className={classes.cardContent}>
        {value ? (
          <>
            <Typography variant="body2" color="textSecondary" component="p">
              {`Current: ${value} ${unit}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {`MAX: ${valueMax} ${unit}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {`MIN: ${valueMin} ${unit}`}
            </Typography>
          </>
        ) : (
          <CircularProgress />
        )}
      </CardContent>
    </Card>
  );
};

export default MeasurementBox;

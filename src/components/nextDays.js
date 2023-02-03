import { Box, Card, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { ArrowDropDown, ArrowDropUp, Grain } from "@mui/icons-material";

function Nextdays(props) {
  const { weatherForecast, celsius } = props;
  return (
    <Grid item xs={10} sm={3} md={4}>
      <Box
        sx={{
          display: "grid",
          backgroundColor: "rgba(255,255,255,0.0)",
          margin: "10px 5px 0 5px",
          gridTemplateColumns: {
            md: "1fr 1fr  ",
            sm: "1fr   ",
            xs: "1fr 1fr  ",
          },
        }}
      >
        {weatherForecast.forecast.forecastday.map((forecastday, index) => {
          if (index == 0) return;
          return (
            <Card
              key={index}
              sx={{
                backgroundColor: "rgba(217, 217, 217,0.6)",
                padding: "25px 20px",
                minHeight: "100%",
                margin: "0 2px 10px 2px ",
                textAlign: "center",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {forecastday.date}
                <br />
                <img src={forecastday.day.condition.icon} />
                <br />
                {forecastday.day.condition.text}
                <br />
              </Typography>

              {celsius ? (
                <>
                  <Typography variant="h4" textAlign="start">
                    <ArrowDropUp color="action" fontSize="small" /> {"High:  "}
                    {forecastday.day.maxtemp_c}
                    {"º"} <br />
                    <ArrowDropDown color="action" fontSize="small" /> {"Low:  "}
                    {forecastday.day.mintemp_c}
                    {"º"}
                    <br />
                    <Grain color="action" fontSize="small" />{" "}
                    {"Chance of rain:  "}
                    {forecastday.day.daily_chance_of_rain}
                    {"%"}
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="h4" textAlign="start">
                    <ArrowDropUp color="action" fontSize="small" /> {"High:  "}
                    {forecastday.day.maxtemp_f}
                    {"º"} <br />
                    <ArrowDropDown color="action" fontSize="small" /> {"Low:  "}
                    {forecastday.day.mintemp_f}
                    {"º"}
                    <br />
                    <Grain color="action" fontSize="small" />{" "}
                    {"Chance of rain:  "}
                    {forecastday.day.daily_chance_of_rain}
                    {"%"}
                  </Typography>
                </>
              )}
            </Card>
          );
        })}
      </Box>

      <Paper
        sx={{
          backgroundColor: "rgba(217, 217, 217,0.6)",
          padding: "5px",
          margin: "15px 2px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(217, 217, 217,0.0)",
            padding: "5px",

            textAlign: "center",
          }}
        >
          <Typography variant="h4" textAlign="start" sx={{ margin: "0 20px " }}>
            {"Name: "}
            {weatherForecast.location.name}, {weatherForecast.location.region},{" "}
            {weatherForecast.location.country}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "rgba(217, 217, 217,0.0)",
            padding: "5px",

            textAlign: "center",
          }}
        >
          <Typography variant="h4" textAlign="start" sx={{ margin: "0 20px " }}>
            {"Latitude: "}
            {weatherForecast.location.lat}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "rgba(217, 217, 217,0.0)",
            padding: "5px",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" textAlign="start" sx={{ margin: "0 20px " }}>
            {"Longitude: "}
            {weatherForecast.location.lon}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "rgba(217, 217, 217,0.0)",
            padding: "5px",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" textAlign="start" sx={{ margin: "0 20px " }}>
            {"Local time: "}
            {weatherForecast.location.localtime}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
}
export default Nextdays;

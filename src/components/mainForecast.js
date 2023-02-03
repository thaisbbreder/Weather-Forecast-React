import { Divider, Grid, Paper, Stack, Tabs, Typography } from "@mui/material";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";

function MainForecast(props) {
  const { weatherForecast, celsius, value, handleChange } = props;

  return (
    <Grid
      item
      xs={10}
      sm={10}
      md={8}
      sx={{ textAlign: "center", maxHeight: "90%",  }}
    >
      <Typography
        variant="h2"
        sx={{
          marginTop: "60px",
          margin: { xs: "10px 0", sm: "10px 0", md:"20px 0" },
          color: "white",
          textShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        {weatherForecast.location.name}
      </Typography>

      {celsius ? (
        <>
          <Typography
            key={celsius}
            variant="h1"
            sx={{
              color: "white",
              textShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
          >
            {weatherForecast.current.temp_c}
            {"ºC"}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              marginBottom: "2%",
              color: "white",
              textShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
          >
            {weatherForecast.current.condition.text}
            <br />
            {"High: "}
            {weatherForecast.forecast.forecastday[0].day.maxtemp_c}
            {"º    "}
            {" |  Low: "}
            {weatherForecast.forecast.forecastday[0].day.mintemp_c}
            {"º"}{" "}
          </Typography>
        </>
      ) : (
        <>
          <Typography
            key={celsius}
            variant="h1"
            sx={{
              color: "white",
              textShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
          >
            {weatherForecast.current.temp_f}
            {"ºF"}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              marginBottom: "2%",
              color: "white",
              textShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
          >
            {" "}
            {weatherForecast.current.condition.text}
            <br />
            {"High: "}
            {weatherForecast.forecast.forecastday[0].day.maxtemp_f}
            {"º    "}
            {" |  Low: "}{" "}
            {weatherForecast.forecast.forecastday[0].day.mintemp_f}
            {"º"}
          </Typography>
        </>
      )}
      <Paper
        key={celsius}
        sx={{
          maxWidth: "100%",
          backgroundColor: "rgba(217, 217, 217,0.6)",
          margin: "auto",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          padding: "5px",
        }}
      > 
        <Tabs
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs"
          orientation="horizontal"
          allowScrollButtonsMobile
          value={value}
          onChange={handleChange}
          sx={{
            maxWidth: "100%",
          }}
        >
          {weatherForecast.forecast.forecastday[0].hour.map(
            (forecastday, index) => {
              if (index >= 0)
                return (
                  <Stack
                    key={index}
                    divider={<Divider orientation="vertical" flexItem />}
                    direction="row"
                    padding={2}
                  >
                    <Typography variant="h4">
                      {index}
                      {":00"}
                      <br />
                      <img src={forecastday.condition.icon} width={40} /> <br />
                      {celsius ? (
                        <Typography key={celsius} variant="h4">
                          {forecastday.temp_c}
                          {"º"}
                        </Typography>
                      ) : (
                        <Typography key={celsius} variant="h4">
                          {forecastday.temp_f}
                          {"º"}
                        </Typography>
                      )}
                    </Typography>
                  </Stack>
                );
            }
          )}
        </Tabs>
      </Paper>
    </Grid>
  );
}

export default MainForecast;

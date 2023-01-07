import {
  Box,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import moment from "moment";
import animationData from "./assets/animation.json";
import { LocationOn } from "@mui/icons-material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AirIcon from "@mui/icons-material/Air";
import OpacityIcon from "@mui/icons-material/Opacity";
import NotesIcon from "@mui/icons-material/Notes";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import { CarouselItem } from "react-bootstrap";

console.log(animationData);
function App() {
  const [currentPosition, setCurrentPosition] = useState("");
  const [weatherForecast, setWeatherForecast] = useState();
  const [city, setCity] = useState("");
  const [celsius, setCelsius] = useState(true);
  const [cold, setCold] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((location) => {
      console.log(location);
      setCurrentPosition(
        location.coords.latitude + "," + location.coords.longitude
      );
    });
    searchCurrentPosition();
  }, [currentPosition]);

  const searchCurrentPosition = () => {
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=a34f75ae0cb04332924154023230301&q=${currentPosition}&days=7&lang=en`
    )
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        setWeatherForecast(data);
      });
  };
  const searchCity = () => {
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=a34f75ae0cb04332924154023230301&q=${city}&days=7&lang=en`
    )
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        setWeatherForecast(data);
      });
    setCity("");
  };

  const toFahrenheit = () => {
    setCelsius(!celsius);
  };

  return (
    <Grid
      container
      direction="row"
      spacing={1}
      style={{
        background: "linear-gradient(to right, #4b6cb7, #182848)",
        height: "100vh",
        color: "white",
      }}
    >
      {weatherForecast ? (
        <Grid
          container
          style={{
            background:
              weatherForecast.current.feelslike_c > 28
                ? "linear-gradient(to bottom, #659999, #f4791f)"
                : "linear-gradient(to right, #4b6cb7, #182848)",
            color: "white",
          }}
        >
          <>
            <Grid item xs={7}>
              <Box
                style={{
                  padding: "20px",
                  marginLeft: "100px",
                }}
              >
                <img
                  style={{ width: "100px" }}
                  src={weatherForecast.current.condition.icon}
                />

                {celsius ? (
                  <Typography style={{ fontSize: "80px" }}>
                    {weatherForecast.current.temp_c}
                    {"º"}
                  </Typography>
                ) : (
                  <Typography style={{ fontSize: "80px" }}>
                    {weatherForecast.current.temp_f}
                    {"º"}
                  </Typography>
                )}
                <Typography style={{ fontSize: "25px" }}>
                  {moment().format("Do MMMM YYYY")}
                </Typography>
                <Typography>{moment().format("dddd LT")}</Typography>
                <Paper style={{ padding: "25px", marginTop: "20px" }}>
                  <Typography>
                    {" "}
                    <NotesIcon />
                    {weatherForecast.current.condition.text}
                  </Typography>

                  {celsius ? (
                    <Typography>
                      <ThermostatIcon />
                      Feels like {weatherForecast.current.feelslike_c}
                      {"º"}
                    </Typography>
                  ) : (
                    <Typography>
                      <ThermostatIcon />
                      Feels like {weatherForecast.current.feelslike_f}
                      {"º"}
                    </Typography>
                  )}
                  <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                  >
                    {celsius ? (
                      <Typography>
                        <ExpandLessIcon />
                        {"High: "}
                        {weatherForecast.forecast.forecastday[0].day.maxtemp_c}
                        {"º"}
                      </Typography>
                    ) : (
                      <Typography>
                        <ExpandLessIcon />
                        {"High: "}
                        {weatherForecast.forecast.forecastday[0].day.maxtemp_f}
                        {"º"}
                      </Typography>
                    )}
                    {celsius ? (
                      <Typography>
                        <ExpandMoreIcon />
                        {"Low: "}
                        {weatherForecast.forecast.forecastday[0].day.mintemp_c}
                        {"º"}
                      </Typography>
                    ) : (
                      <Typography>
                        <ExpandMoreIcon />
                        {"Low: "}
                        {weatherForecast.forecast.forecastday[0].day.mintemp_f}
                        {"º"}
                      </Typography>
                    )}
                    <Typography>
                      <OpacityIcon />
                      Humidity: {weatherForecast.current.humidity}{" "}
                    </Typography>
                    <Typography>
                      <AirIcon />
                      Wind: {weatherForecast.current.precip_in}{" "}
                    </Typography>{" "}
                  </Stack>
                </Paper>
              </Box>

              <Grid item xs={7}>
                <Stack
                  direction="horizontal"
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={1}
                  marginTop={5}
                >
                  <Typography
                    style={{
                      fontWeight: "bold",
                      padding: "5px",
                      margin: "auto",
                      textAlign: "center",
                      fontSize: "20px",
                    }}
                  >
                    HOURLY FORECAST
                  </Typography>
                  <Carousel centerMode={true} touch={true} swipeable={true}>
                    {weatherForecast.forecast.forecastday[0].hour.map(
                      (forecasthour) => (
                        <CarouselItem interval={100000}>
                          <Stack
                            direction="row"
                            divider={
                              <Divider orientation="vertical" flexItem />
                            }
                            spacing={1}
                            marginTop={5}
                          >
                            <Paper
                              style={{
                                padding: "20px",
                                backgroundColor: "rgba(255,255,255,0.5)",
                              }}
                            >
                              <Typography> {forecasthour.time}</Typography>

                              <img src={forecasthour.condition.icon} />
                              {celsius ? (
                                <Typography>
                                  {forecasthour.temp_c}
                                  {"º"}
                                </Typography>
                              ) : (
                                <Typography>{forecasthour.temp_f}</Typography>
                              )}
                            </Paper>
                          </Stack>
                        </CarouselItem>
                      )
                    )}
                  </Carousel>
                </Stack>
              </Grid>
            </Grid>

            <Grid item xs={1}>
              <Stack direction="row" alignItems="center">
                <Typography>ºC</Typography>
                <Switch color="default" onClick={toFahrenheit} />
                <Typography>ºF</Typography>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Paper
                style={{
                  padding: "40px",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "white",
                  height: "100vh",
                }}
              >
                <Typography
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    marginBottom: "5px",
                  }}
                >
                  <LocationOn />
                  {weatherForecast.location.name},{" "}
                  {weatherForecast.location.region}
                </Typography>

                <TextField
                  id="standard-basic"
                  variant="standard"
                  value={city}
                  style={{ width: "80%", padding: "10px" }}
                  onChange={(e) => setCity(e.target.value)}
                />
                <IconButton onClick={searchCity}>
                  <SearchIcon />
                </IconButton>

                <Typography style={{ marginTop: "10px" }}>
                  {"Moon phase: "}
                  {weatherForecast.forecast.forecastday[0].astro.moon_phase}
                </Typography>
                <Typography>
                  {"Sunrise: "}
                  {weatherForecast.forecast.forecastday[0].astro.sunrise}
                </Typography>
                <Typography>
                  {"Sunset: "}
                  {weatherForecast.forecast.forecastday[0].astro.sunset}
                </Typography>
                <Stack
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={1}
                  marginTop={5}
                >
                  <Typography
                    style={{
                      fontWeight: "bold",
                      padding: "20px",
                      margin: "auto",
                      textAlign: "center",
                      fontSize: "20px",
                    }}
                  >
                    NEXT <br /> TWO
                    <br /> DAYS
                  </Typography>

                  {weatherForecast.forecast.forecastday.map(
                    (forecastday, index) => {
                      if (index == 0) return;
                      return (
                        <Paper
                          style={{
                            padding: "30px",
                            backgroundColor: "rgba(255,255,255,0.5)",
                          }}
                        >
                          <Typography>
                            {"  "}
                            {forecastday.date}
                          </Typography>

                          <img src={forecastday.day.condition.icon} />
                          {celsius ? (
                            <Typography>
                              {"High: "}
                              {forecastday.day.maxtemp_c}
                              {"º"}
                              <br />
                              {"Low: "}
                              {forecastday.day.mintemp_c}
                              {"º"}
                            </Typography>
                          ) : (
                            <Typography>
                              {"High: "}
                              {forecastday.day.maxtemp_f}
                              {"º"}
                              <br />
                              {"Low: "}
                              {forecastday.day.mintemp_f}
                              {"º"}
                            </Typography>
                          )}
                        </Paper>
                      );
                    }
                  )}
                </Stack>
              </Paper>
            </Grid>
          </>
        </Grid>
      ) : (
        <Grid style={{ margin: "auto" }}>
          <Typography> Colocar uma animação aqui </Typography>
          <TextField
            id="standard-basic"
            variant="outlined"
            placeholder="Search for city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <IconButton onClick={searchCity}>
            <SearchIcon />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
}

export default App;

import {
  Card,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import moment from "moment";

function App() {
  const [currentPosition, setCurrentPosition] = useState("");
  const [weatherForecast, setWeatherForecast] = useState();
  const [city, setCity] = useState("");

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
  };

  return (
    <Grid
      container
      direction="row"
      spacing={2}
      style={{
        background:
          "linear-gradient(125deg, #eac5ff 0, #c7afff 25%, #a598f9 50%, #8681d4 75%, #6a6cb2 100%)",
        height: "100vh",
        width: "100vw",
      }}
    >
      {weatherForecast ? (
        <>
          <Grid item xs={8}>
            <Paper
              style={{
                padding: "70px",
                margin: "40px 40px 0 40px",
              }}
            >
              <Typography style={{ fontSize: "80px" }}>
                <img src={weatherForecast.current.condition.icon} />

                {weatherForecast.current.temp_c}
                {"º"}
              </Typography>
              <Typography> {weatherForecast.current.condition.text}</Typography>

              <Typography>
                Feels like {weatherForecast.current.feelslike_c}
                {"º"}
              </Typography>
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
              >
                <Typography>
                  Humidity: {weatherForecast.current.humidity}{" "}
                </Typography>
                <Typography>
                  Precipitação: {weatherForecast.current.precip_in}{" "}
                </Typography>
                <Typography>
                  Wind: {weatherForecast.current.precip_in}{" "}
                </Typography>{" "}
                //corrigir //corrigir
              </Stack>

              <Typography style={{ fontWeight: "bold", marginTop: "25px" }}>
                Previsão do tempo semanal
              </Typography>
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={0}
              >
                <Paper style={{ margin: "5px 5px", padding: "20px" }}>
                  <Typography>
                    {"Data: "}
                    {weatherForecast.forecast.forecastday[1].date}
                  </Typography>

                  <img
                    src={
                      weatherForecast.forecast.forecastday[1].day.condition.icon
                    }
                  />
                  <Typography>
                    {" Temp. min: "}
                    {weatherForecast.forecast.forecastday[1].day.mintemp_c}
                    {"º"}
                  </Typography>
                  <Typography>
                    {"Temp. máx: "}
                    {weatherForecast.forecast.forecastday[1].day.maxtemp_c}
                    {"º"}
                  </Typography>
                </Paper>

                <Paper style={{ margin: "5px 5px", padding: "20px" }}>
                  <Typography>
                    {" Data: "}
                    {weatherForecast.forecast.forecastday[2].date}
                  </Typography>
                  <img
                    src={
                      weatherForecast.forecast.forecastday[2].day.condition.icon
                    }
                  />

                  <Typography>
                    {" Temp. min: "}
                    {weatherForecast.forecast.forecastday[2].day.mintemp_c}
                    {"º"}
                  </Typography>
                  <Typography>
                    {"Temp. máx: "}
                    {weatherForecast.forecast.forecastday[2].day.maxtemp_c}
                    {"º"}
                  </Typography>
                </Paper>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Card style={{ margin: "40px 40px 0 0", padding: "40px" }}>
              <Typography
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginBottom: "5px",
                }}
              >
                {weatherForecast.location.name},{" "}
                {weatherForecast.location.region}
              </Typography>
              <Typography>{moment().format("LLL")}</Typography>
              <TextField
                id="standard-basic"
                variant="standard"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <IconButton aria-label="searchCity" onClick={searchCity}>
                <SearchIcon />
              </IconButton>

              <Typography style={{ marginTop: "10px" }}>
                {"Moon phase: "}
                {weatherForecast.forecast.forecastday[0].astro.moon_phase}
              </Typography>
              <Typography>
                {"Moonrise: "}
                {weatherForecast.forecast.forecastday[0].astro.moonrise}
                <Typography>
                  {"Moonset: "}
                  {weatherForecast.forecast.forecastday[0].astro.moonset}
                </Typography>
                <Typography>
                  {"Sunrise: "}
                  {weatherForecast.forecast.forecastday[0].astro.sunrise}
                </Typography>
                <Typography>
                  {"Sunset: "}
                  {weatherForecast.forecast.forecastday[0].astro.sunset}
                </Typography>
              </Typography>
            </Card>
          </Grid>
        </>
      ) : (
        <Grid style={{ margin: "auto" }}>
          <TextField
            id="standard-basic"
            variant="outlined"
            placeholder="Search for places"
            value={currentPosition}
            onChange={(e) => setCurrentPosition(e.target.value)}
          />
          <IconButton aria-label="searchCity" onClick={searchCity}>
            <SearchIcon />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
}

export default App;

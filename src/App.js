import {
  Box,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
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
  const [celsius, setCelsius] = useState(true);

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

  const conversion = () => {
    setCelsius(!celsius);
  };

  return (
    <Grid
      container
      direction="row"
      spacing={1}
      style={{
        background:
          "linear-gradient(125deg, #eac5ff 0, #c7afff 25%, #a598f9 50%, #8681d4 75%, #6a6cb2 100%)",
        height: "100vh",
      }}
    >
      {weatherForecast ? (
        <>
          <Grid item xs={7}>
            <Box
              style={{
                padding: "40px",
                margin: "0px 40px 0 40px",
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
              <Typography style={{ fontSize: "25px", marginBottom: "10px" }}>
                {moment().format("Do MMMM YY")}
              </Typography>
              <Typography style={{ marginBottom: "10px" }}>
                {moment().format("dddd LT")}
              </Typography>

              <Typography> {weatherForecast.current.condition.text}</Typography>

              {celsius ? (
                <Typography>
                  Feels like {weatherForecast.current.feelslike_c}
                  {"º"}
                </Typography>
              ) : (
                <Typography>
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
                    Max. temp.:{" "}
                    {weatherForecast.forecast.forecastday[0].day.maxtemp_c}{" "}
                  </Typography>
                ) : (
                  <Typography>
                    Max. temp.:{" "}
                    {weatherForecast.forecast.forecastday[0].day.maxtemp_f}{" "}
                  </Typography>
                )}
                {celsius ? (
                  <Typography>
                    Min. temp.:{" "}
                    {weatherForecast.forecast.forecastday[0].day.mintemp_c}{" "}
                  </Typography>
                ) : (
                  <Typography>
                    Min. temp.:{" "}
                    {weatherForecast.forecast.forecastday[0].day.mintemp_f}{" "}
                  </Typography>
                )}
                <Typography>
                  Humidity: {weatherForecast.current.humidity}{" "}
                </Typography>
                <Typography>
                  Precipitation: {weatherForecast.current.precip_in}{" "}
                </Typography>
                <Typography>
                  Wind: {weatherForecast.current.precip_in}{" "}
                </Typography>{" "}
              </Stack>

              <Typography
                style={{
                  fontWeight: "bold",
                  marginTop: "40px",
                  padding: "10px",
                }}
              >
                Previsão do tempo semanal
              </Typography>
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={0}
              >
                <Paper
                  style={{
                    margin: "5px 5px",
                    padding: "20px",
                    backgroundColor: "rgba(255,255,255,0.5)",
                  }}
                >
                  <Typography>
                    {"Data: "}
                    {weatherForecast.forecast.forecastday[1].date}
                  </Typography>

                  <img
                    src={
                      weatherForecast.forecast.forecastday[1].day.condition.icon
                    }
                  />
                  {celsius ? (
                    <Typography>
                      {" Temp. min: "}
                      {weatherForecast.forecast.forecastday[1].day.mintemp_c}
                      {"º"}
                    </Typography>
                  ) : (
                    <Typography>
                      {" Temp. min: "}
                      {weatherForecast.forecast.forecastday[1].day.mintemp_f}
                      {"º"}
                    </Typography>
                  )}
                  {celsius ? (
                    <Typography>
                      {"Temp. máx: "}
                      {weatherForecast.forecast.forecastday[1].day.maxtemp_c}
                      {"º"}
                    </Typography>
                  ) : (
                    <Typography>
                      {"Temp. máx: "}
                      {weatherForecast.forecast.forecastday[1].day.maxtemp_f}
                      {"º"}
                    </Typography>
                  )}
                </Paper>

                <Paper
                  style={{
                    margin: "5px 5px",
                    padding: "20px",
                    backgroundColor: "rgba(255,255,255,0.5)",
                  }}
                >
                  <Typography>
                    {" Data: "}
                    {weatherForecast.forecast.forecastday[2].date}
                  </Typography>
                  <img
                    src={
                      weatherForecast.forecast.forecastday[2].day.condition.icon
                    }
                  />

                  {celsius ? (
                    <Typography>
                      {" Temp. min: "}
                      {weatherForecast.forecast.forecastday[2].day.mintemp_c}
                      {"º"}
                    </Typography>
                  ) : (
                    <Typography>
                      {" Temp. min: "}
                      {weatherForecast.forecast.forecastday[2].day.mintemp_f}
                      {"º"}
                    </Typography>
                  )}
                  {celsius ? (
                    <Typography>
                      {"Temp. máx: "}
                      {weatherForecast.forecast.forecastday[2].day.maxtemp_c}
                      {"º"}
                    </Typography>
                  ) : (
                    <Typography>
                      {"Temp. máx: "}
                      {weatherForecast.forecast.forecastday[2].day.maxtemp_f}
                      {"º"}
                    </Typography>
                  )}
                </Paper>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Switch
              defaultChecked
              color="default"
              label="F"
              onClick={conversion}
            />
          </Grid>

          <Grid item xs={4}>
            <Paper
              style={{
                padding: "40px",
                backgroundColor: "rgba(255,255,255,0.5)",

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
                {weatherForecast.location.name},{" "}
                {weatherForecast.location.region}
              </Typography>

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
            </Paper>
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

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      )}
    </Grid>
  );
}

export default App;

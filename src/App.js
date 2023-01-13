import {
  Box,
  Container,
  createTheme,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Paper,
  Stack,
  Switch,
  Tabs,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import NotesIcon from "@mui/icons-material/Notes";
import GradeIcon from "@mui/icons-material/Grade";
import OpacityIcon from "@mui/icons-material/Opacity";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  AirOutlined,
  Clear,
  LensOutlined,
  NightlightRoundOutlined,
  Thermostat,
  Thunderstorm,
  WbSunnyOutlined,
  WbTwilight,
} from "@mui/icons-material";
import axios from "axios";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Poppins",
      color: "#FFFFFF",
    },
  },
});

function App() {
  const [currentPosition, setCurrentPosition] = useState("");
  const [weatherForecast, setWeatherForecast] = useState("");
  const [city, setCity] = useState("");
  const [celsius, setCelsius] = useState(true);
  const [menu, setMenu] = useState(false);
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((location) => {
      console.log(location);
      setCurrentPosition(
        location.coords.latitude + "," + location.coords.longitude
      );
    });
    searchCurrentPosition();
  }, [currentPosition]);

  useEffect(() => {
    localStorage.setItem("saveFavoriteCity", JSON.stringify(favorite));
  }, [favorite]);

  useEffect(() => {
    const saveFavoriteCity = JSON.parse(
      localStorage.getItem("saveFavoriteCity")
    );
    if (saveFavoriteCity) {
      setFavorite(saveFavoriteCity);
    }
  }, []);

  const searchCity = () => {
    axios
      .get(
        `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${city}&days=7&lang=en`
      )
      .then((response) => {
        setWeatherForecast(response.data);
        console.log(response.data);
      });
    setCity("");
  };
  const searchCurrentPosition = () => {
    axios
      .get(
        `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${currentPosition}&days=7&lang=en`
      )
      .then((response) => {
        setWeatherForecast(response.data);
        console.log(response.data);
      });
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setMenu({ ...menu, [anchor]: open });
  };

  const toFahrenheit = () => {
    setCelsius(!celsius);
  };

  const addFavoriteCity = () => {
    const favoriteList = [...favorite];
    const addCity = {
      id: favorite.length + 1,
      city: weatherForecast.location.name,
      weather: weatherForecast.current.temp_c,
      condition: weatherForecast.current.condition.text,
    };
    favoriteList.push(addCity);
    setFavorite(favoriteList);
  };

  const deleteFavoriteCity = (id) => {
    const newFavoriteList = favorite.filter((city) => city.id !== id);
    setFavorite(newFavoriteList);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        direction="row"
        style={{
          height: "100vh",
          color: "white",
        }}
      >
        {weatherForecast ? (
          <Grid
            container
            spacing={1}
            style={{
              background:
                weatherForecast.current.feelslike_c > 27
                  ? "linear-gradient(180deg, rgba(173, 114, 45, 0.78) 0%, rgba(122, 82, 5, 0.78) 70.67%)"
                  : "linear-gradient(180deg, rgba(28, 60, 79, 0.78) 0%, rgba(0, 29, 50, 0.78) 97.61%)",
              color: "white",
            }}
          >
            <>
              <Grid item xs={2}>
                {["left"].map((anchor) => (
                  <React.Fragment key={anchor}>
                    <IconButton onClick={toggleDrawer(anchor, true)}>
                      <NotesIcon style={{ margin: "20px" }} />
                    </IconButton>
                    <Drawer
                      anchor={anchor}
                      open={menu[anchor]}
                      onClose={toggleDrawer(anchor, false)}
                    >
                      <Paper
                        style={{
                          height: "982px",
                          width: "360px",
                        }}
                      >
                        <TextField
                          id="standard-basic"
                          variant="standard"
                          value={city}
                          style={{
                            width: "80%",
                            margin: "20px 0",
                            padding: "10px",
                          }}
                          onChange={(e) => setCity(e.target.value)}
                        />
                        <IconButton
                          style={{ marginTop: "20px" }}
                          onClick={searchCity}
                        >
                          <SearchIcon />
                        </IconButton>

                        {favorite.map((favorite, index) => {
                          return (
                            <Paper
                              key={index}
                              elevation={2}
                              style={{
                                margin: "10px ",
                                backgroundColor: "#A8A8A8",
                                height: "140px",
                                width: "333px",
                              }}
                            >
                              {" "}
                              <Typography style={{ textAlign: "end" }}>
                                <IconButton
                                  onClick={() =>
                                    deleteFavoriteCity(favorite.id)
                                  }
                                >
                                  <Clear color="disabled" fontSize="small" />
                                </IconButton>
                              </Typography>
                              <Typography
                                style={{ margin: "0 25px", fontSize: "20px" }}
                              >
                                {favorite.city}
                              </Typography>
                              <Typography
                                style={{
                                  margin: "0 25px",

                                  fontSize: "15px",
                                }}
                              >
                                {favorite.condition}
                              </Typography>
                              <Typography
                                style={{
                                  margin: "0 25px",
                                  fontSize: "30px",
                                  textAlign: "end",
                                }}
                              >
                                {" "}
                                {favorite.weather} {" ºC"}
                              </Typography>
                            </Paper>
                          );
                        })}
                      </Paper>
                    </Drawer>
                  </React.Fragment>
                ))}
              </Grid>

              <Grid
                item
                xs={8}
                style={{ textAlign: "center", marginTop: "40px" }}
              >
                <Typography
                  style={{
                    fontSize: "30px",
                  }}
                >
                  {weatherForecast.location.name}
                </Typography>

                {celsius ? (
                  <Typography style={{ fontSize: "60px" }}>
                    {weatherForecast.current.temp_c}
                    {"ºC"}
                  </Typography>
                ) : (
                  <Typography style={{ fontSize: "60px" }}>
                    {weatherForecast.current.temp_f}
                    {"ºF"}
                  </Typography>
                )}
                <Typography style={{ fontSize: "15px", margin: "10px 0" }}>
                  {weatherForecast.current.condition.text}

                  {celsius ? (
                    <>
                      <Typography>
                        {"High: "}
                        {weatherForecast.forecast.forecastday[0].day.maxtemp_c}
                        {"º    "}
                        {"Low: "}
                        {weatherForecast.forecast.forecastday[0].day.mintemp_c}
                        {"º"}
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography>
                        {"High: "}
                        {weatherForecast.forecast.forecastday[0].day.maxtemp_f}
                        {"º    "}
                        {"Low: "}
                        {weatherForecast.forecast.forecastday[0].day.mintemp_f}
                        {"º"}
                      </Typography>
                    </>
                  )}
                </Typography>
                {/*    <Divider>
                  {" "}
                  <Typography>Hourly forecast</Typography>{" "}
                </Divider> */}
                {/* Tentar tirar a data, deixar só a hora */}
                <Tabs
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                  orientation="horizontal"
                  style={{
                    maxHeight: "400px",
                    backgroundColor: "rgba(255,255,255,0.3)",
                    borderRadius: "5px",
                  }}
                >
                  {weatherForecast.forecast.forecastday[0].hour.map(
                    (forecastday, indice) => {
                      if (indice >= 0)
                        return (
                          <>
                            <Stack
                              divider={
                                <Divider orientation="vertical" flexItem />
                              }
                              direction="row"
                              padding={2}
                            >
                              <Typography>
                                {indice}
                                {":00"}
                                <br />
                                <img
                                  src={forecastday.condition.icon}
                                  width={30}
                                />{" "}
                                <br />
                                {celsius ? (
                                  <>
                                    {forecastday.temp_c}
                                    {"º"}
                                  </>
                                ) : (
                                  <>
                                    {forecastday.temp_f}
                                    {"º"}
                                  </>
                                )}
                              </Typography>
                            </Stack>
                          </>
                        );
                    }
                  )}
                </Tabs>
              </Grid>

              <Grid item xs={2}>
                <Stack
                  direction="row"
                  alignItems="center"
                  style={{ margin: "10px 0" }}
                >
                  {/* colocar mensagem de que a cidade foi favoritada */}
                  <IconButton onClick={addFavoriteCity}>
                    <GradeIcon fontSize="small" style={{ color: "#FFFF" }} />
                  </IconButton>
                  {"ºC"}
                  <Switch color="default" onClick={toFahrenheit} />
                  {"ºF"}
                </Stack>
              </Grid>
            </>
            <Grid item xs={2}>
              {/* meu git e linkedin */}
            </Grid>
            <Grid item xs={3}>
              <Divider>
                {" "}
                <Typography>Weather datails</Typography>{" "}
              </Divider>

              <Paper
                style={{
                  backgroundColor: "rgba(255,255,255,0.3)",
                  marginTop: "3px",
                  padding: "5px",
                }}
              >
                <Typography>
                  <Thermostat style={{ color: "#E6E8FA" }} />{" "}
                  {celsius ? (
                    <>
                      {"Feels like: "} {weatherForecast.current.feelslike_c}
                      {"º"}
                    </>
                  ) : (
                    <>
                      {"Feels like: "} {weatherForecast.current.feelslike_f}
                      {"º"}
                    </>
                  )}
                </Typography>
              </Paper>

              <Paper
                style={{
                  backgroundColor: "rgba(255,255,255,0.3)",
                  marginTop: "3px",
                  padding: "5px",
                }}
              >
                <Typography>
                  <OpacityIcon fontSize="small" style={{ color: "#E6E8FA" }} />{" "}
                  Humidity: {weatherForecast.current.humidity}
                  {"%"}
                </Typography>
              </Paper>

              <Paper
                style={{
                  backgroundColor: "rgba(255,255,255,0.3)",
                  marginTop: "3px",
                  padding: "5px",
                }}
              >
                <Typography>
                  <Thunderstorm fontSize="small" style={{ color: "#E6E8FA" }} />{" "}
                  Preciptation: {weatherForecast.current.precip_mm}
                  {"mm"}
                </Typography>
              </Paper>
              <Paper
                style={{
                  backgroundColor: "rgba(255,255,255,0.3)",
                  marginTop: "3px",
                  padding: "5px",
                }}
              >
                <Typography>
                  <AirOutlined fontSize="small" style={{ color: "#E6E8FA" }} />{" "}
                  Wind: {weatherForecast.current.wind_kph}
                  {"km/h "} {weatherForecast.current.wind_dir}
                </Typography>
              </Paper>

              <Paper
                style={{
                  backgroundColor: "rgba(255,255,255,0.3)",
                  marginTop: "3px",
                  padding: "5px",
                }}
              >
                <Typography>
                  <WbSunnyOutlined
                    fontSize="small"
                    style={{ color: "#E6E8FA" }}
                  />{" "}
                  Sunrise:{" "}
                  {weatherForecast.forecast.forecastday[0].astro.sunrise}
                </Typography>
              </Paper>

              <Paper
                style={{
                  backgroundColor: "rgba(255,255,255,0.3)",
                  marginTop: "3px",
                  padding: "5px",
                }}
              >
                <Typography>
                  <WbTwilight fontSize="small" style={{ color: "#E6E8FA" }} />{" "}
                  Sunset: {weatherForecast.forecast.forecastday[0].astro.sunset}
                </Typography>
              </Paper>
              <Paper
                style={{
                  backgroundColor: "rgba(255,255,255,0.3)",
                  marginTop: "3px",
                  padding: "5px",
                }}
              >
                <Typography>
                  <NightlightRoundOutlined
                    fontSize="small"
                    style={{ color: "#E6E8FA" }}
                  />{" "}
                  Moon ilumination:{" "}
                  {
                    weatherForecast.forecast.forecastday[0].astro
                      .moon_illumination
                  }
                  {"%"}
                </Typography>
              </Paper>

              <Paper
                style={{
                  backgroundColor: "rgba(255,255,255,0.3)",
                  marginTop: "3px",
                  padding: "5px",
                }}
              >
                <Typography>
                  <LensOutlined fontSize="small" style={{ color: "#E6E8FA" }} />{" "}
                  Moon phase:{" "}
                  {weatherForecast.forecast.forecastday[0].astro.moon_phase}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={5}>
              <Divider>
                {" "}
                <Typography>Next days</Typography>{" "}
              </Divider>
              {weatherForecast.forecast.forecastday.map((forecastday, id) => {
                if (id == 0) return;
                return (
                  <Paper
                    style={{
                      margin: "4px 0",
                      backgroundColor: "rgba(255,255,255,0.3)",
                    }}
                  >
                    <Stack
                      divider={<Divider orientation="vertical" flexItem />}
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={4}
                      padding={2}
                    >
                      <Typography>
                        {forecastday.date}
                        <br />
                        <img
                          src={forecastday.day.condition.icon}
                          style={{
                            maxWidth: "65px",
                          }}
                        />
                        <br />
                        {forecastday.day.condition.text}
                      </Typography>

                      {celsius ? (
                        <>
                          <Typography>
                            {"High:  "}
                            {forecastday.day.maxtemp_c}
                            {"º"}
                            <br />
                            {"Low:  "}
                            {forecastday.day.mintemp_c}
                            {"º"}
                            <br />
                            {"Chance of rain:  "}{" "}
                            {forecastday.day.daily_chance_of_rain}
                            {"%"}
                          </Typography>
                        </>
                      ) : (
                        <>
                          <Typography>
                            {"High:  "}
                            {forecastday.day.maxtemp_f}
                            {"º"}
                            <br />
                            {"Low:  "}
                            {forecastday.day.mintemp_f}
                            {"º"}
                            <br />
                            {"Chance of rain:  "}
                            {forecastday.day.daily_chance_of_rain}
                            {"%"}
                          </Typography>
                        </>
                      )}
                    </Stack>
                  </Paper>
                );
              })}
            </Grid>
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
    </ThemeProvider>
  );
}

export default App;

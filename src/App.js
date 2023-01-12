import {
  Box,
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
  Thunderstorm,
  WbSunnyOutlined,
  WbTwilight,
} from "@mui/icons-material";
import axios from "axios";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Poppins",
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

  const searchCity = () => {
    axios
      .get(
        `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${city}&days=7&lang=en`
      )
      .then((response) => {
        setWeatherForecast(response.data);
        console.log(response.data);
      });
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
      nome: weatherForecast.location.name,
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

  useEffect(() => {
    localStorage.setItem("saveFavoriteCity", JSON.stringify(favorite));
  }, [favorite]);

  //corrigir
  useEffect(() => {
    const saveFavoriteCity = JSON.parse(
      localStorage.getItem("saveFavoriteCity")
    );
    if (saveFavoriteCity) {
      setFavorite(saveFavoriteCity);
      console.log(favorite);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        direction="row"
        spacing={1}
        style={{
          // background: "white",
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
                            padding: "10px",
                            marginBottom: "20px",
                          }}
                          onChange={(e) => setCity(e.target.value)}
                        />
                        <IconButton
                          style={{ marginTop: "10px" }}
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
                                backgroundColor: "rgba(255,255,255,0.5)",
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
                                {favorite.nome}
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
                style={{ textAlign: "center", marginTop: "30px" }}
              >
                <Typography
                  style={{
                    fontSize: "25px",
                  }}
                >
                  {weatherForecast.location.name}
                </Typography>

                <Typography style={{ fontSize: "15px" }}>
                  {weatherForecast.current.condition.text}

                  {celsius ? (
                    <>
                      <Typography>
                        {"Feelslike: "} {weatherForecast.current.feelslike_c}
                        <br />
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
                        {"Feelslike: "} {weatherForecast.current.feelslike_f}{" "}
                        <br />
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
                <Paper
                  style={{
                    backgroundColor: "rgba(255,255,255,0.5)",
                    borderRadius: "14px",
                    padding: "15px",
                    overflow: "auto",
                  }}
                >
                  <Stack
                    divider={<Divider orientation="vertical" flexItem />}
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    spacing={1}
                    padding={1}
                  >
                    <Typography>
                      <OpacityIcon fontSize="small" />
                      Humidity: {weatherForecast.current.humidity}
                      {"% "}
                      <br />
                      <Thunderstorm fontSize="small" />
                      Preciptation: {weatherForecast.current.precip_mm}
                      {"mm"}
                    </Typography>
                    <Typography>
                      <AirOutlined fontSize="small" />
                      Wind: {weatherForecast.current.wind_kph}
                      {"km/h "} {weatherForecast.current.wind_dir} <br />
                    </Typography>

                    <Typography>
                      <WbSunnyOutlined fontSize="small" />
                      Sunrise:{" "}
                      {weatherForecast.forecast.forecastday[0].astro.sunrise}
                      <br />
                      <WbTwilight fontSize="small" />
                      Sunset:{" "}
                      {weatherForecast.forecast.forecastday[0].astro.sunset}
                    </Typography>
                    <Typography>
                      <NightlightRoundOutlined fontSize="small" />
                      Moon ilumination:{" "}
                      {
                        weatherForecast.forecast.forecastday[0].astro
                          .moon_illumination
                      }
                      <br />
                      <LensOutlined fontSize="small" />
                      Moon phase:{" "}
                      {weatherForecast.forecast.forecastday[0].astro.moon_phase}
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>

              <Grid item xs={2}>
                <Stack
                  direction="row"
                  alignItems="center"
                  style={{ margin: "20px 0 0 100px" }}
                >
                  <IconButton onClick={addFavoriteCity}>
                    <GradeIcon />
                  </IconButton>
                  <Typography>ºC</Typography>
                  <Switch color="default" onClick={toFahrenheit} />
                  <Typography>ºF</Typography>
                </Stack>
              </Grid>
            </>
            <Grid item xs={2}>
              }{/* meu git e linkedin */}
            </Grid>
            <Grid item xs={4}>
              <Tabs
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
                orientation="vertical"
                style={{ maxHeight: "400px" }}
              >
                {weatherForecast.forecast.forecastday[0].hour.map(
                  (forecastday, hour) => {
                    if (hour >= 0)
                      return (
                        <>
                          <Box style={{ width: "50%" }}>
                            <Typography
                              style={{
                                textAlign: "center",
                              }}
                            >
                              {forecastday.time}{" "}
                            </Typography>
                          </Box>
                          <Paper
                            style={{
                              margin: "2px",
                              backgroundColor: "rgba(255,255,255,0.5)",
                              justifyContent: "space-around",
                              alignItems: "center",
                            }}
                          >
                            <Typography>
                              <img
                                src={forecastday.condition.icon}
                                width={30}
                              />{" "}
                              {forecastday.condition.text}
                              {forecastday.temp_c}
                              {"ºC "}
                            </Typography>
                          </Paper>
                        </>
                      );
                  }
                )}
              </Tabs>
            </Grid>
            <Grid item xs={4}>
              {weatherForecast.forecast.forecastday.map((forecastday, id) => {
                if (id == 0) return;
                return (
                  <Paper
                    style={{
                      width: "50%",
                      margin: "5px 0",
                      backgroundColor: "rgba(255,255,255,0.5)",
                    }}
                  >
                    {celsius ? (
                      <Typography>
                        {forecastday.date}

                        <img
                          src={forecastday.day.condition.icon}
                          style={{
                            maxWidth: "40px",
                          }}
                        />

                        {"High: "}
                        {forecastday.day.maxtemp_c}
                        {"º"}

                        {"Low: "}
                        {forecastday.day.mintemp_c}
                        {"º"}
                      </Typography>
                    ) : (
                      <Typography>
                        {forecastday.date}

                        <img src={forecastday.day.condition.icon} />

                        {"High: "}
                        {forecastday.day.maxtemp_f}
                        {"º"}

                        {"Low: "}
                        {forecastday.day.mintemp_f}
                        {"º"}
                      </Typography>
                    )}
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

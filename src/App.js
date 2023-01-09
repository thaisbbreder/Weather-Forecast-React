import {
  Box,
  Container,
  Divider,
  Drawer,
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
import animationData from "./assets/animation.json";
import NotesIcon from "@mui/icons-material/Notes";
import AirIcon from "@mui/icons-material/Air";
import GradeIcon from "@mui/icons-material/Grade";
import OpacityIcon from "@mui/icons-material/Opacity";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import { CarouselItem } from "react-bootstrap";
import moment from "moment/moment";

console.log(animationData);
function App() {
  const [currentPosition, setCurrentPosition] = useState(""); //lat, long
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
    };
    favoriteList.push(addCity);
    setFavorite(favoriteList);
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
    <Grid
      container
      direction="row"
      spacing={1}
      style={{
        background: "white",
        height: "100vh",
        color: "white",
      }}
    >
      {weatherForecast ? (
        <Grid
          container
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
                    <Box role="presentation">
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
                            elevation={4}
                            style={{
                              margin: "10px ",
                              padding: "20px",
                              backgroundColor: "rgba(255,255,255,0.5)",
                            }}
                          >
                            <Typography> {favorite.nome} </Typography>
                            <Typography> {favorite.weather} </Typography>
                          </Paper>
                        );
                      })}
                    </Box>
                  </Drawer>
                </React.Fragment>
              ))}
            </Grid>
            <Grid item xs={8}>
              <Container style={{ padding: "40px", textAlign: "center" }}>
                <Typography
                  style={{
                    fontSize: "25px",
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

                {celsius ? (
                  <Typography>
                    {weatherForecast.current.condition.text} <br />
                    Feels like {weatherForecast.current.feelslike_c}
                    {"º"}
                  </Typography>
                ) : (
                  <Typography>
                    {weatherForecast.current.condition.text}
                    <br />
                    Feels like {weatherForecast.current.feelslike_f}
                    {"º"}
                  </Typography>
                )}

                {celsius ? (
                  <Typography style={{ fontSize: "13px" }}>
                    {"High: "}
                    {weatherForecast.forecast.forecastday[0].day.maxtemp_c}
                    {"º    "}
                    {"Low: "}
                    {weatherForecast.forecast.forecastday[0].day.mintemp_c}
                    {"º"}
                  </Typography>
                ) : (
                  <Typography style={{ fontSize: "13px" }}>
                    {"High: "}
                    {weatherForecast.forecast.forecastday[0].day.maxtemp_f}
                    {"º    "}
                    {"Low: "}
                    {weatherForecast.forecast.forecastday[0].day.mintemp_f}
                    {"º"}
                  </Typography>
                )}

                <Paper
                  style={{
                    backgroundColor: "rgba(255,255,255,0.5)",
                    marginTop: "30px",
                  }}
                >
                  <Carousel>
                    <CarouselItem interval={100000}>
                      <Stack direction="row">
                        {weatherForecast.forecast.forecastday[0].hour
                          .slice(0, 8)
                          .map((forecasthour) => (
                            <Box style={{ margin: "10px 0 40px 0 " }}>
                              <Typography style={{ fontSize: "15px" }}>
                                {" "}
                                {forecasthour.time}
                              </Typography>

                              <img
                                src={forecasthour.condition.icon}
                                style={{ width: "30%" }}
                              />
                              {celsius ? (
                                <Typography>
                                  {forecasthour.temp_c}
                                  {"º"}
                                </Typography>
                              ) : (
                                <Typography>{forecasthour.temp_f}</Typography>
                              )}
                            </Box>
                          ))}
                      </Stack>
                    </CarouselItem>
                    <CarouselItem interval={1000000}>
                      <Stack direction="row">
                        {weatherForecast.forecast.forecastday[0].hour
                          .slice(8, 16)
                          .map((forecasthour) => (
                            <Box style={{ margin: "10px 0 40px 0 " }}>
                              <Typography style={{ fontSize: "15px" }}>
                                {" "}
                                {forecasthour.time}
                              </Typography>

                              <img
                                src={forecasthour.condition.icon}
                                style={{ width: "30%" }}
                              />
                              {celsius ? (
                                <Typography>
                                  {forecasthour.temp_c}
                                  {"º"}
                                </Typography>
                              ) : (
                                <Typography>{forecasthour.temp_f}</Typography>
                              )}
                            </Box>
                          ))}
                      </Stack>
                    </CarouselItem>
                    <CarouselItem interval={100000}>
                      <Stack direction="row">
                        {weatherForecast.forecast.forecastday[0].hour
                          .slice(16, 24)
                          .map((forecasthour) => (
                            <Box style={{ margin: "10px 0 40px 0 " }}>
                              <Typography style={{ fontSize: "15px" }}>
                                {" "}
                                {forecasthour.time}
                              </Typography>

                              <img
                                src={forecasthour.condition.icon}
                                style={{ width: "30%" }}
                              />
                              {celsius ? (
                                <Typography>
                                  {forecasthour.temp_c}
                                  {"º"}
                                </Typography>
                              ) : (
                                <Typography>{forecasthour.temp_f}</Typography>
                              )}
                            </Box>
                          ))}
                      </Stack>
                    </CarouselItem>
                  </Carousel>
                </Paper>

                {weatherForecast.forecast.forecastday.map((forecastday, id) => {
                  if (id == 0) return;
                  return (
                    <Paper
                      style={{
                        //padding: "5px",
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
                              //padding: "5px",
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

                <Paper style={{ width: "50%" }}>
                  {" "}
                  <Typography style={{ fontSize: "25px" }}>
                    {moment().format("Do MMMM YYYY")}
                  </Typography>
                  <Typography>{moment().format("dddd LT")}</Typography>
                  <Paper style={{ padding: "25px", marginTop: "20px" }}>
                    <Stack
                      direction="row"
                      divider={<Divider orientation="vertical" flexItem />}
                      spacing={2}
                    >
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
                </Paper>
              </Container>
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

import {
  Box,
  Container,
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
  const [menu, setMenu] = useState(false);

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
            <Grid item xs={2}>
              {["left"].map((anchor) => (
                <React.Fragment key={anchor}>
                  <IconButton>
                    <NotesIcon
                      style={{ margin: "20px" }}
                      onClick={toggleDrawer(anchor, true)}
                    />
                  </IconButton>
                  <Drawer
                    anchor={anchor}
                    open={menu[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                  >
                    <Box role="presentation">
                      {/*   <IconButton>
                          <NotesIcon
                            style={{ margin: "20px",}}
                            onClick={toggleDrawer(anchor, false)}
                          />
                        </IconButton> */}
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

                      <Paper
                        elevation={4}
                        style={{
                          margin: "10px ",
                          padding: "20px",
                          backgroundColor: "rgba(255,255,255,0.5)",
                        }}
                      >
                        <Typography
                          style={{
                            fontWeight: "bold",
                            fontSize: "15px",
                          }}
                        >
                          {weatherForecast.location.name},{" "}
                          {weatherForecast.location.region}
                        </Typography>
                        {celsius ? (
                          <Typography
                            style={{ fontSize: "35px", textAlign: "end" }}
                          >
                            {weatherForecast.current.temp_c}
                            {"º"}
                          </Typography>
                        ) : (
                          <Typography
                            style={{ fontSize: "35px", textAlign: "end" }}
                          >
                            {weatherForecast.current.temp_f}
                            {"º"}
                          </Typography>
                        )}
                      </Paper>
                    </Box>
                  </Drawer>
                </React.Fragment>
              ))}

              {/*   <Grid item xs={3}>
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

             

                          <img src={forecastday.day.condition.icon} />
          
            </Grid> */}
            </Grid>
            <Grid item xs={8}>
              <Container style={{ padding: "40px", textAlign: "center" }}>
                <Typography
                  style={{
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  {weatherForecast.location.name},{" "}
                  {weatherForecast.location.region}
                </Typography>

                {/*  <img
                  src={weatherForecast.current.condition.icon}
                /> */}
                {celsius ? (
                  <Typography style={{ fontSize: "80px" }}>
                    {weatherForecast.current.temp_c}
                    {"ºC"}
                  </Typography>
                ) : (
                  <Typography style={{ fontSize: "80px" }}>
                    {weatherForecast.current.temp_f}
                    {"ºF"}
                  </Typography>
                )}
                <Typography>
                  {weatherForecast.current.condition.text}
                </Typography>

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

                {celsius ? (
                  <Typography>
                    {"High: "}
                    {weatherForecast.forecast.forecastday[0].day.maxtemp_c}
                    {"º    "}
                    {"Low: "}
                    {weatherForecast.forecast.forecastday[0].day.mintemp_c}
                    {"º"}
                  </Typography>
                ) : (
                  <Typography>
                    {"High: "}
                    {weatherForecast.forecast.forecastday[0].day.maxtemp_f}
                    {"º    "}
                    {"Low: "}
                    {weatherForecast.forecast.forecastday[0].day.mintemp_f}
                    {"º"}
                  </Typography>
                )}

          
                <Paper style={{ backgroundColor: "rgba(255,255,255,0.5)" , marginTop:"30px", }}>
                  <Carousel
                    keyboard={true}
                    centerMode={true}
                    touch={true}
                    swipeable={true}
                  >
                    <CarouselItem interval={100000}>
                      <Stack direction="row">
                        {weatherForecast.forecast.forecastday[0].hour
                          .slice(0, 8)
                          .map((forecasthour) => (
                            <Box style={{ margin:"10px 0 40px 0 ",}}>
                              <Typography style={{fontSize:"15px" }}> {forecasthour.time}</Typography>

                              <img src={forecasthour.condition.icon} style={{ width:'30%'}}/>
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
                            <Box style={{ margin:"10px 0 40px 0 ",}}>
                              <Typography style={{fontSize:"15px" }}> {forecasthour.time}</Typography>

                              <img src={forecasthour.condition.icon} style={{ width:'30%'}}/>
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
                          .slice(16,24)
                          .map((forecasthour) => (
                            <Box style={{ margin:"10px 0 40px 0 ",}}>
                              <Typography style={{fontSize:"15px" }}> {forecasthour.time}</Typography>

                              <img src={forecasthour.condition.icon} style={{ width:'30%'}}/>
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

                {weatherForecast.forecast.forecastday.map(
                  (forecastday, index) => {
                    if (index == 0) return;
                    return (
                      <Paper
                        style={{
                          //padding: "5px",
                          width: "50%",
                          margin: "5px",
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
                  }
                )}

                {/*   <Typography style={{ fontSize: "25px" }}>
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
                </Paper>*/}
              </Container>
            </Grid>

            <Grid item xs={2}>
              <Stack direction="row" alignItems="center">
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

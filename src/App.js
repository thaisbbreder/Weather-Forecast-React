import {
  Box,
  Button,
  Card,
  createTheme,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Paper,
  Stack,
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
  ArrowDropDown,
  ArrowDropUp,
  Clear,
  CloudQueue,
  Grain,
  LensOutlined,
  NightlightRoundOutlined,
  RunningWithErrors,
  Search,
  Thermostat,
  Thunderstorm,
  Visibility,
  WbIridescent,
  WbSunnyOutlined,
  WbTwilight,
  WbTwilightOutlined,
} from "@mui/icons-material";
import axios from "axios";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

const theme = createTheme();

theme.typography.h1 = {
  fontFamily: "Poppins",
  fontColor: "#646464",

  fontSize: "1.6rem",
  "@media (min-width:600px)": {
    fontSize: "1.6rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "4rem",
  },
};

theme.typography.h2 = {
  fontFamily: "Poppins",
  color: "#424242",

  fontSize: "1.2rem",
  "@media (min-width:600px)": {
    fontSize: "1.2rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem",
  },
};

theme.typography.h3 = {
  fontFamily: "Poppins",
  color: "#424242",
  fontSize: "1rem",
  "@media (min-width:600px)": {
    fontSize: "1rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.5rem",
  },
};

theme.typography.h4 = {
  fontFamily: "Poppins",
  color: "#424242",

  fontSize: "0.8rem",
  "@media (min-width:600px)": {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1rem",
  },
};

theme.typography.h5 = {
  fontFamily: "Poppins",
  color: "#424242",

  fontSize: "0.6rem",
  "@media (min-width:600px)": {
    fontSize: "0.6rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "0.8rem",
  },
};

function App() {
  const [currentPosition, setCurrentPosition] = useState("");
  const [weatherForecast, setWeatherForecast] = useState("");
  const [city, setCity] = useState("");
  const [celsius, setCelsius] = useState(true);
  const [menu, setMenu] = useState(false);
  const [favorite, setFavorite] = useState([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((location) => {
      setCurrentPosition(
        location.coords.latitude + "," + location.coords.longitude
      );
    });
    searchCurrentPosition();
  }, [currentPosition]);

  const searchCity = () => {
    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=a6135ba5564d49bd8dc31329231101&q=${city}&days=7&lang=en`
      )
      .then((response) => {
        setWeatherForecast(response.data);
        console.log(response.data);
      });
    setCity("");
  };
  const searchCurrentPosition = () => {
    if (!currentPosition) return;
    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=a6135ba5564d49bd8dc31329231101&q=${currentPosition}&days=7&lang=en`
      )
      .then((response) => {
        setWeatherForecast(response.data);
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
    const newFavoriteList = favorite.filter((city) => {
      return city.id !== id;
    });
    setFavorite(newFavoriteList);
    localStorage.setItem("saveFavoriteCity", JSON.stringify(newFavoriteList));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      {weatherForecast ? (
        <Grid
          container
          padding={1}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            minHeight: "100vh",
            height: "auto",
            overflow: "hidden",
            backgroundImage:
              weatherForecast.current.feelslike_c > 22
                ? "url('https://cdn.pixabay.com/photo/2022/07/08/08/46/mountain-7308803_960_720.png')"
                : "url('https://cdn.pixabay.com/photo/2020/02/05/15/47/natural-4821583_960_720.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <>
            <Grid item sm={1} xs={1}>
              {["left"].map((anchor, index) => (
                <React.Fragment key={index}>
                  <IconButton onClick={toggleDrawer(anchor, true)}>
                    <NotesIcon fontSize="small" />
                  </IconButton>
                  <br />
                  <IconButton onClick={toggleDrawer(anchor, true)}>
                    <Search fontSize="small" />
                  </IconButton>
                  <br />
                  <IconButton onClick={addFavoriteCity}>
                    <GradeIcon fontSize="small" />
                  </IconButton>
                  <Drawer
                    anchor={anchor}
                    open={menu[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                  >
                    <Paper>
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
                        style={{ marginTop: "3%" }}
                        onClick={searchCity}
                      >
                        <SearchIcon />
                      </IconButton>
                    </Paper>
                    {favorite.map((favorite, index) => {
                      return (
                        <Paper
                          key={index}
                          elevation={2}
                          style={{
                            margin: "10px ",
                            backgroundColor: "#A8A8A8",
                            height: "auto",
                            width: "333px",
                          }}
                        >
                          {" "}
                          <Typography style={{ textAlign: "end" }}>
                            <IconButton
                              onClick={() => deleteFavoriteCity(favorite.id)}
                            >
                              <Clear color="disabled" fontSize="small" />
                            </IconButton>
                          </Typography>
                          <Typography
                            variant="h3"
                            style={{
                              margin: "10px 25px",
                            }}
                          >
                            {favorite.city}
                          </Typography>
                          <Typography
                            variant="h4"
                            style={{
                              margin: "0 25px",
                            }}
                          >
                            {favorite.condition}
                          </Typography>
                          <Typography
                            variant="h2"
                            style={{
                              margin: "10px 25px",

                              textAlign: "end",
                            }}
                          >
                            {favorite.weather} {" ºC"}
                          </Typography>
                        </Paper>
                      );
                    })}
                  </Drawer>
                </React.Fragment>
              ))}
            </Grid>

            <Grid item xs={10} sm={10} style={{ textAlign: "center" }}>
              <Typography
                variant="h2"
                style={{
                  marginTop: "20px",
                  color: "white",
                }}
              >
                {weatherForecast.location.name}
              </Typography>

              {celsius ? (
                <>
                  <Typography
                    variant="h1"
                    style={{
                      color: "white",
                    }}
                  >
                    {weatherForecast.current.temp_c}
                    {"ºC"}
                  </Typography>
                  <Typography
                    variant="h5"
                    style={{ marginBottom: "3%", color: "white" }}
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
                  <Typography variant="h1" style={{ color: "white" }}>
                    {weatherForecast.current.temp_f}
                    {"ºF"}
                  </Typography>
                  <Typography
                    variant="h5"
                    style={{ marginBottom: "3%", color: "white" }}
                  >
                    {" "}
                    {weatherForecast.current.condition.text}
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
              <Divider
                style={{
                  maxWidth: "80%",
                  margin: "auto",
                }}
              >
                {" "}
                <Typography variant="h4" style={{ color: "white" }}>
                  Hourly Forecast
                </Typography>{" "}
              </Divider>
              <Tabs
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs"
                orientation="horizontal"
                allowScrollButtonsMobile
                value={value}
                onChange={handleChange}
                style={{
                  maxWidth: "80%",
                  backgroundColor: "rgba(255,255,255,0.5)",
                  borderRadius: "10px",
                  margin: "auto",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  padding: "10px",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                {weatherForecast.forecast.forecastday[0].hour.map(
                  (forecastday, index) => {
                    if (index >= 0)
                      return (
                        <Stack
                          divider={<Divider orientation="vertical" flexItem />}
                          direction="row"
                          padding={2}
                        >
                          <Typography variant="h4">
                            {index}
                            {":00"}
                            <br />
                            <img
                              src={forecastday.condition.icon}
                              width={40}
                            />{" "}
                            <br />
                            {celsius ? (
                              <Typography variant="h4">
                                {forecastday.temp_c}
                                {"º"}
                              </Typography>
                            ) : (
                              <Typography variant="h4">
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
            </Grid>

            <Grid item xs={1} sm={1}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
              >
                {" "}
                <Button
                  variant="text"
                  style={{ color: "#FFFF" }}
                  onClick={toFahrenheit}
                >
                  <Typography variant="h4back"> ºC | ºF </Typography>
                </Button>
              </Stack>
            </Grid>
          </>

          <Grid item xs={8} md={2}>
            <Divider>
              {" "}
              <Typography variant="h4" style={{ color: "white" }}>
                Weather details
              </Typography>{" "}
            </Divider>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { md: "2fr" },
              }}
              style={{
                backgroundColor: "rgba(255,255,255,0.5)",
                padding: "15px",
                minHeight: "85%",
                maxHeight: "86%",
                borderRadius: "10px",
                margin: "10px 10px 10px 5px",
                textAlign: "start",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
            >
              <Typography variant="h4">
                <Thermostat color="action" />{" "}
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
                <Divider />
              </Typography>

              <Typography variant="h4">
                <OpacityIcon color="action" fontSize="small" /> Humidity:{" "}
                {weatherForecast.current.humidity}
                {"%"} <Divider />
              </Typography>

              <Typography variant="h4">
                <Thunderstorm color="action" fontSize="small" /> Precip:{" "}
                {weatherForecast.current.precip_mm}
                {"mm"} <Divider />
              </Typography>

              <Typography variant="h4">
                <AirOutlined color="action" fontSize="small" /> Wind:{" "}
                {weatherForecast.current.wind_kph}
                {"km/h "} {weatherForecast.current.wind_dir} <Divider />
              </Typography>

              <Typography variant="h4">
                <CloudQueue color="action" fontSize="small" /> Cloud:{" "}
                {weatherForecast.current.cloud}
                {"%"} <Divider />
              </Typography>

              <Typography variant="h4">
                <RunningWithErrors color="action" fontSize="small" /> Pressure:{" "}
                {weatherForecast.current.precip_mm}
                {"mm"} <Divider />
              </Typography>

              <Typography variant="h4">
                <Visibility color="action" fontSize="small" /> Visibility:{" "}
                {weatherForecast.current.vis_km}
                {"mm"} <Divider />
              </Typography>

              <Typography variant="h4">
                <WbIridescent color="action" fontSize="small" /> UV:{" "}
                {weatherForecast.current.uv}
                {"mm"} <Divider />
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={8} md={3}>
            <Divider>
              <Typography variant="h4" style={{ color: "white" }}>
                Astro
              </Typography>
            </Divider>
            <Box
              sx={{
                display: "grid",
                margin: "10px 5px ",
                minHeight: "85%",
                maxHeight: "86%",
                gridTemplateColumns: { md: "1fr 1fr" },
              }}
            >
              <Card
                style={{
                  backgroundColor: "rgba(255,255,255,0.5)",
                  padding: "25px",
                  borderRadius: "10px",
                  margin: "3px 2px 10px 2px ",
                  textAlign: "center",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                }}
              >
                <WbSunnyOutlined
                  color="action"
                  sx={{ fontSize: 50 }}
                  style={{ margin: "auto" }}
                />
                <Typography variant="h4">Sunrise: </Typography>
                <Typography variant="h4">
                  {weatherForecast.forecast.forecastday[0].astro.sunrise}
                </Typography>
              </Card>

              <Card
                style={{
                  backgroundColor: "rgba(255,255,255,0.5)",
                  padding: "25px",
                  borderRadius: "10px",
                  margin: "3px 2px 10px 2px ",
                  textAlign: "center",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                }}
              >
                <WbTwilightOutlined color="action" sx={{ fontSize: 50 }} />
                <Typography variant="h4">Sunset: </Typography>
                <Typography variant="h4">
                  {weatherForecast.forecast.forecastday[0].astro.sunset}
                </Typography>
              </Card>
              <Card
                style={{
                  backgroundColor: "rgba(255,255,255,0.5)",
                  padding: "25px",
                  borderRadius: "10px",
                  margin: "0px 2px 10px 2px ",
                  textAlign: "center",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                }}
              >
                <NightlightRoundOutlined color="action" sx={{ fontSize: 50 }} />
                <Typography variant="h4">Illumination: </Typography>
                <Typography variant="h4">
                  {
                    weatherForecast.forecast.forecastday[0].astro
                      .moon_illumination
                  }
                  {"%"}
                </Typography>
              </Card>
              <Card
                style={{
                  backgroundColor: "rgba(255,255,255,0.5)",
                  padding: "20px",
                  borderRadius: "10px",
                  margin: "0px 2px 10px 2px ",
                  textAlign: "center",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                }}
              >
                <LensOutlined color="action" sx={{ fontSize: 50 }} />
                <Typography variant="h4" style={{ textAlign: "center" }}>
                  Moon phase:
                </Typography>
                <Typography variant="h4">
                  {weatherForecast.forecast.forecastday[0].astro.moon_phase}
                </Typography>
              </Card>
            </Box>
          </Grid>

          <Grid item xs={8} md={3}>
            <Divider>
              {" "}
              <Typography variant="h4" style={{ color: "white" }}>
                Next days
              </Typography>{" "}
            </Divider>
            <Box
              sx={{
                display: "grid",
                margin: "5px",
                gridTemplateColumns: { md: "1fr 1fr" },
                minHeight: "85%",
                maxHeight: "86%",
              }}
            >
              {weatherForecast.forecast.forecastday.map(
                (forecastday, index) => {
                  if (index == 0) return;
                  return (
                    <Paper
                      key={index}
                      style={{
                        backgroundColor: "rgba(255,255,255,0.5)",
                        borderRadius: "10px",
                        margin: "10px 3px",
                        textAlign: "center",
                        padding: "15%",
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                      }}
                    >
                      <Typography variant="h4" style={{ fontWeight: "bold" }}>
                        {forecastday.date}
                      </Typography>
                      <Stack
                        divider={<Divider orientation="vertical" flexItem />}
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="center"
                        padding={3}
                      >
                        <img
                          src={forecastday.day.condition.icon}
                          style={{
                            maxWidth: "80%",
                            padding: "5%",
                          }}
                        />
                        <Typography variant="h4">
                          {forecastday.day.condition.text}
                        </Typography>
                      </Stack>
                      {celsius ? (
                        <>
                          <Typography
                            variant="h4"
                            style={{
                              textAlign: "justify",
                              marginTop: "1%",
                            }}
                          >
                            <ArrowDropUp color="action" fontSize="small" />{" "}
                            {"High:  "}
                            {forecastday.day.maxtemp_c}
                            {"º"}
                          </Typography>
                          <Typography
                            variant="h4"
                            style={{
                              textAlign: "justify",
                              marginTop: "5%",
                            }}
                          >
                            <ArrowDropDown color="action" fontSize="small" />{" "}
                            {"Low:  "}
                            {forecastday.day.mintemp_c}
                            {"º"}
                          </Typography>
                          <Typography
                            variant="h4"
                            style={{
                              textAlign: "justify",
                              marginTop: "5%",
                              marginBottom: "5%",
                            }}
                          >
                            <Grain color="action" fontSize="small" />{" "}
                            {"Chance of rain:  "}
                            {forecastday.day.daily_chance_of_rain}
                            {"%"}
                          </Typography>
                        </>
                      ) : (
                        <>
                          <Typography
                            variant="h4"
                            style={{
                              textAlign: "justify",
                              marginTop: "15%",
                            }}
                          >
                            <ArrowDropUp color="action" fontSize="small" />{" "}
                            {"High:  "}
                            {forecastday.day.maxtemp_f}
                            {"º"}
                          </Typography>
                          <Typography
                            variant="h4"
                            style={{
                              textAlign: "justify",
                              marginTop: "5%",
                            }}
                          >
                            <ArrowDropDown color="action" fontSize="small" />{" "}
                            {"Low:  "}
                            {forecastday.day.mintemp_f}
                            {"º"}
                          </Typography>
                          <Typography
                            variant="h4"
                            style={{
                              textAlign: "justify",
                              marginTop: "5%",
                            }}
                          >
                            <Grain color="action" fontSize="small" />{" "}
                            {"Chance of rain:  "}
                            {forecastday.day.daily_chance_of_rain}
                            {"%"}
                          </Typography>
                        </>
                      )}
                    </Paper>
                  );
                }
              )}
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Box
          style={{
            textAlign: "center",
            margin: "auto",
            minHeight: "100vh",
            height: "auto",
            background: "linear-gradient(to right, #ffd89b, #19547b)",
          }}
        >
          <Player
            autoplay
            loop
            src="https://assets9.lottiefiles.com/private_files/lf30_jmgekfqg.json"
            style={{ maxeight: "600px", width: "500px" }}
            background="transparent"
          >
            <Controls
              visible={false}
              buttons={["play", "repeat", "frame", "debug"]}
            />
          </Player>
          <TextField
            id="filled-basic"
            label="Search location"
            variant="filled"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{
              textAlign: "center",
            }}
          />

          <IconButton onClick={searchCity}>
            <SearchIcon />
          </IconButton>
        </Box>
      )}
    </ThemeProvider>
  );
}

export default App;

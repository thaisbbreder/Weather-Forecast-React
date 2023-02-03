import { createTheme, Grid, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import MainForecast from "./components/mainForecast";
import Highlights from "./components/highlights";
import Nextdays from "./components/nextDays";
import Menu from "./components/menu";
import Home from "./components/home";
import ConvertTemp from "./components/convertTemp";
import Links from "./components/links";

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
  const [favorite, setFavorite] = useState([]);
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!city) {
      navigator.geolocation.getCurrentPosition((location) => {
        setCity(location.coords.latitude + "," + location.coords.longitude);
      });
    }
    searchCity();
  }, [city]);

  const searchCity = () => {
    if (!city) return;

    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=a6135ba5564d49bd8dc31329231101&q=${city}&days=7&lang=en`
      )
      .then((response) => {
        setWeatherForecast(response.data);
        console.log(response.data);
      });
    setCurrentPosition("");
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
    localStorage.setItem("saveFavoriteCity", JSON.stringify(favorite));
    setOpen(true);
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
          columnpacing={5}
          spacing={2}
          sx={{
            overflow: "hidden",
            justifyContent: "center",
            minHeight: "100vh",
            height: "auto",
            backgroundImage:
              weatherForecast.current.feelslike_c > 25
                ? "url('https://cdn.pixabay.com/photo/2022/07/08/08/46/mountain-7308803_960_720.png')"
                : "url('https://cdn.pixabay.com/photo/2020/02/05/15/47/natural-4821583_960_720.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <>
            <Menu
              currentPosition={currentPosition}
              setCurrentPosition={setCurrentPosition}
              open={open}
              setOpen={setOpen}
              city={city}
              setCity={setCity}
              searchCity={searchCity}
              favorite={favorite}
              setFavorite={setFavorite}
              addFavoriteCity={addFavoriteCity}
            />
            <MainForecast
              weatherForecast={weatherForecast}
              celsius={celsius}
              value={value}
              handleChange={handleChange}
            />

            <ConvertTemp toFahrenheit={toFahrenheit} />
          </>

          <Highlights weatherForecast={weatherForecast} celsius={celsius} />
          <Nextdays weatherForecast={weatherForecast} celsius={celsius} />
          <Links />
        </Grid>
      ) : (
        <Home
          setCity={setCity}
          setCurrentPosition={setCurrentPosition}
          currentPosition={currentPosition}
          searchCity={searchCity}
        />
      )}
    </ThemeProvider>
  );
}

export default App;

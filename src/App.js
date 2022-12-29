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
import { useState } from "react";

function App() {
  const [city, setCity] = useState("Belo Horizonte");
  const [weatherForecast, setWeatherForecast] = useState(null);

  const searchCity = () => {
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=c503cd880ab949a69ed190330222712&q=${city}&days=7&lang=pt`
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
      <Grid item xs={8}>
        <Paper
          style={{
            padding: "40px",
            margin: "40px 40px 0 40px",
          }}
        >
          <img src={weatherForecast.current.condition.icon} />
          <Typography style={{ fontSize: "80px" }}>
            {weatherForecast.current.temp_c}
            {"º"}
          </Typography>
          <Typography>
            Feels Like: {weatherForecast.current.feelslike_c}
            {"º"}
          </Typography>
          <Typography> {weatherForecast.current.condition.text}</Typography>
          <Typography> {weatherForecast.location.localtime}</Typography>
          <Typography style={{ fontWeight: "bold", marginTop: "25px" }}>
            Previsão do tempo semanal
          </Typography>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={0}
          >
            <Paper style={{ margin: "40px", padding: "20px" }}>
              <Typography>
                {"Data: "}
                {weatherForecast.forecast.forecastday[1].date}
              </Typography>
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

            <Paper style={{ margin: "40px", padding: "20px" }}>
              <Typography>
                {" Data: "}
                {weatherForecast.forecast.forecastday[2].date}
              </Typography>
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
    </Grid>
  );
}

export default App;

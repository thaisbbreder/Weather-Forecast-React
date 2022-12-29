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
      `http://api.weatherapi.com/v1/forecast.json?key=c503cd880ab949a69ed190330222712&q=${city}&days=7&lang=pt&alerts=yes`
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
    <Grid container direction="row" spacing={4}>
      <Grid item xs={8}>
        <Paper style={{ margin: "40px", padding: "40px" }}>
          <img src={weatherForecast.current.condition.icon} />
          <Typography style={{ fontSize: "80px" }}>
            {weatherForecast.current.temp_c}
          </Typography>
          <Typography>
            Feels Like: {weatherForecast.current.feelslike_c}
          </Typography>
          <Typography> {weatherForecast.current.condition.text}</Typography>
          <Typography> {weatherForecast.location.localtime}</Typography>
          <Typography style={{ fontWeight: "bold", marginTop:"25px" }}>
            Previsão do tempo semanal
          </Typography>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={0}
          >
            <Paper style={{ margin: "40px", padding: "10px" }}>
              <Typography>
                {"Data: "}
                {weatherForecast.forecast.forecastday[1].date}
              </Typography>
              <Typography>
                {" Temp. mínima: "}
                {weatherForecast.forecast.forecastday[1].day.mintemp_c}
              </Typography>
              <Typography>
                {"Temp. máxima: "}
                {weatherForecast.forecast.forecastday[1].day.maxtemp_c}
              </Typography>
            </Paper>

            <Paper style={{ margin: "40px", padding: "10px" }}>
              <Typography>
                {" Data: "}
                {weatherForecast.forecast.forecastday[2].date}
              </Typography>
              <Typography>
                {" Temp. mínima: "}
                {weatherForecast.forecast.forecastday[2].day.mintemp_c}
              </Typography>
              <Typography>
                {"Temp. máxima: "}
                {weatherForecast.forecast.forecastday[2].day.maxtemp_c}
              </Typography>
            </Paper>
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Card style={{ marginTop:"40px", padding: "40px" }}>
          <TextField
            id="standard-basic"
            label="Standard"
            variant="standard"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <IconButton aria-label="searchCity" onClick={searchCity}>
            <SearchIcon />
          </IconButton>
        </Card>
      </Grid>
    </Grid>
  );
}

export default App;

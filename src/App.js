import { Grid, IconButton, Paper, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

function App() {
  const [city, setCity] = useState("Belo Horizonte");
  const [weatherForecast, setWeatherForecast] = useState(null);

  const searcssearchCity = () => {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=c503cd880ab949a69ed190330222712&q=${city}&lang=pt`
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
      <Grid item xs={8} style={{}}>
        {/*<Typography>{weatherForecast.current.temp_c}</Typography>*/}
        {weatherForecast ? (
          <img src={weatherForecast.current.condition.icon} />
        ) : null}
        <Typography style={{ fontSize: "80px" }}>27º</Typography>
        <Typography>27 Dez 22</Typography>
        <Typography>Terça</Typography>
      </Grid>

      <Grid item xs={4}>
        <Paper>
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
          <Typography>Localização</Typography>
          <Typography>Hora</Typography>
        </Paper>
      </Grid>

      <Grid item xs={4} direction="column">
        <Typography>Previsão do tempo semanal</Typography>
      </Grid>
    </Grid>
  );
}

export default App;

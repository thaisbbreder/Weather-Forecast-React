import { Box, Grid, Paper, Typography } from "@mui/material";
import OpacityIcon from "@mui/icons-material/Opacity";
import React from "react";
 import {
  AirOutlined,
  CloudQueue,
  LensOutlined,
  NightlightRoundOutlined,
  RunningWithErrors,
  Thermostat,
  Thunderstorm,
  Visibility,
  WbIridescent,
  WbSunnyOutlined,
  WbTwilightOutlined,
} from "@mui/icons-material";

function Highlights(props) {
  const { weatherForecast, celsius } = props;

  return (
    <Grid item xs={10} md={4} sm={7}>
      <Paper
        sx={{
          backgroundColor: "rgba(217, 217, 217,0.6)",
          padding: "10px",
          margin: "10px 0",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <Box
          sx={{
            display: "grid",
            backgroundColor: "rgba(255,255,255,0.0)",
            gridTemplateColumns: {
              md: "1fr 1fr 1fr 1fr ",
              sm: "1fr 1fr ",
              xs: "1fr 1fr ",
            },
          }}
        >
          <Box
            sx={{
              padding: "15px 15px 10px 15px",
              textAlign: "center",
              backgroundColor: "rgba(255,255,255,0.0)",
            }}
          >
            <Thermostat color="action" sx={{ fontSize: 30, margin: "auto" }} />

            <Typography variant="h4">
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
          </Box>
          <Box
            sx={{
              padding: "15px 15px 10px 15px",
              textAlign: "center",
              backgroundColor: "rgba(255,255,255,0.0)",
            }}
          >
            <CloudQueue color="action" sx={{ fontSize: 30 }} />
            <Typography variant="h4">
              Cloud: {weatherForecast.current.cloud}
              {"%"}
            </Typography>
          </Box>

          <Box
            sx={{
              padding: "15px 15px 10px 15px",
              textAlign: "center",
              backgroundColor: "rgba(255,255,255,0.0)",
            }}
          >
            <Thunderstorm color="action" sx={{ fontSize: 30 }} />
            <Typography variant="h4">
              Precip: {weatherForecast.current.precip_mm}
              {"mm"}
            </Typography>
          </Box>
          <Box
            sx={{
              padding: "15px 15px 10px 15px",
              textAlign: "center",
              backgroundColor: "rgba(255,255,255,0.0)",
            }}
          >
            <WbIridescent color="action" sx={{ fontSize: 30 }} />
            <Typography variant="h4">
              UV: {weatherForecast.current.uv}
              {"mm"}
            </Typography>
          </Box>
          <Box
            sx={{
              padding: "10px 15px 15px 15px",
              textAlign: "center",
              backgroundColor: "rgba(255,255,255,0.0)",
            }}
          >
            <Visibility color="action" sx={{ fontSize: 30 }} />
            <Typography variant="h4">
              Visibility: {weatherForecast.current.vis_km}
              {"mm"}
            </Typography>
          </Box>
          <Box
            sx={{
              padding: "10px 15px 15px 15px",
              textAlign: "center",
              backgroundColor: "rgba(255,255,255,0.0)",
            }}
          >
            <AirOutlined color="action" sx={{ fontSize: 30 }} />
            <Typography variant="h4">
              Wind: {weatherForecast.current.wind_kph}
              {"km/h "}{" "}
            </Typography>{" "}
            <Typography variant="h4">
              {" "}
              {weatherForecast.current.wind_dir}
            </Typography>
          </Box>

          <Box
            sx={{
              padding: "10px 15px 15px 15px",
              textAlign: "center",
              backgroundColor: "rgba(255,255,255,0.0)",
            }}
          >
            <RunningWithErrors color="action" sx={{ fontSize: 30 }} />
            <Typography variant="h4">
              {" "}
              Pressure: {weatherForecast.current.precip_mm}
              {"mm"}
            </Typography>
          </Box>
          <Box
            sx={{
              padding: "10px 15px 15px 15px",
              textAlign: "center",
              backgroundColor: "rgba(255,255,255,0.0)",
            }}
          >
            <OpacityIcon color="action" sx={{ fontSize: 30 }} />
            <Typography variant="h4">
              Humidity: {weatherForecast.current.humidity}
              {"%"}
            </Typography>
          </Box>
        </Box>
      </Paper>
      <Paper
        sx={{
          backgroundColor: "rgba(217, 217, 217,0.6)",
          padding: "5px",
          margin: "15px 0",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <Box
          sx={{
            display: "grid",
            backgroundColor: "rgba(255,255,255,0.0)",
            gridTemplateColumns: { md: "1fr 1fr 1fr 1fr ", xs: "1fr 1fr  " },
          }}
        >
          <Box
            sx={{
              padding: "15px",
              textAlign: "center",
              backgroundColor: "rgba(255,255,255,0.0)",
            }}
          >
            <WbSunnyOutlined
              color="action"
              sx={{ fontSize: 30, margin: "auto" }}
            />
            <Typography variant="h4">Sunrise: </Typography>
            <Typography variant="h4">
              {weatherForecast.forecast.forecastday[0].astro.sunrise}
            </Typography>
          </Box>

          <Box
            sx={{
              padding: "15px",
              textAlign: "center",
              backgroundColor: "rgba(255,255,255,0.0)",
            }}
          >
            <WbTwilightOutlined color="action" sx={{ fontSize: 30 }} />
            <Typography variant="h4">Sunset: </Typography>
            <Typography variant="h4">
              {weatherForecast.forecast.forecastday[0].astro.sunset}
            </Typography>
          </Box>
          <Box
            sx={{
              padding: "15px",
              textAlign: "center",
              backgroundColor: "rgba(255,255,255,0.0)",
            }}
          >
            <NightlightRoundOutlined color="action" sx={{ fontSize: 30 }} />
            <Typography variant="h4">Illumination: </Typography>
            <Typography variant="h4">
              {weatherForecast.forecast.forecastday[0].astro.moon_illumination}
              {"%"}
            </Typography>
          </Box>
          <Box
            sx={{
              padding: "15px",
              textAlign: "center",
              backgroundColor: "rgba(255,255,255,0.0)",
            }}
          >
            <LensOutlined color="action" sx={{ fontSize: 30 }} />
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Phase:
            </Typography>
            <Typography variant="h4">
              {weatherForecast.forecast.forecastday[0].astro.moon_phase}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
}

export default Highlights;

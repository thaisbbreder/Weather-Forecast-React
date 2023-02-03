import {
  Box,
  IconButton,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { LinkedIn } from "@mui/icons-material";
import GitHubIcon from "@mui/icons-material/GitHub";

function Home(props) {
  const { setCity, setCurrentPosition, searchCity, currentPosition } = props;
  return (
    <Box
      sx={{
        textAlign: "center",
        margin: "auto",
        minHeight: "100vh",
        height: "auto",
        backgroundImage:
          "url('https://cdn.pixabay.com/photo/2021/04/27/15/03/lake-6211741_960_720.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          padding: "10% 0 2% 0",
          color: "white",
          textShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          fontWeight: "bold",
        }}
      >
        Weather forecast
      </Typography>

      <Paper
        component="form"
        sx={{
          p: "5px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
          margin: "auto",
        }}
      >
        <TextField
          id="standard-basic"
          label="Search location"
          variant="outlined"
          fullWidth
          value={currentPosition}
          onChange={(e) => setCurrentPosition(e.target.value)}
        />

        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={() => {
            setCity(currentPosition);
          }}
        >
          <SearchIcon />
        </IconButton>
      </Paper>

      <Link href="https://github.com/thaisbbreder" onClick={() => {}}>
        <IconButton
          type="button"
          aria-label="search"
          onClick={searchCity}
          sx={{ color: "white", marginTop: "50px" }}
        >
          <GitHubIcon />
        </IconButton>
      </Link>
      <Link href="https://www.linkedin.com/in/thaisbbreder/" onClick={() => {}}>
        <IconButton
          type="button"
          sx={{ p: "10px", color: "white", marginTop: "50px" }}
          aria-label="search"
          onClick={searchCity}
        >
          <LinkedIn />
        </IconButton>
      </Link>
    </Box>
  );
}

export default Home;

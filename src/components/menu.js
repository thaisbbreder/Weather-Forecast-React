import {
  Alert,
  Box,
  Drawer,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotesIcon from "@mui/icons-material/Notes";
import GradeIcon from "@mui/icons-material/Grade";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Clear, Search } from "@mui/icons-material";

function Menu(props) {
  const {
    open,
    setOpen,
    currentPosition,
    setCurrentPosition,
    setCity,
    favorite,
    setFavorite,
    addFavoriteCity,
  } = props;
  const [menu, setMenu] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setMenu({ ...menu, [anchor]: open });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const deleteFavoriteCity = (id) => {
    const newFavoriteList = favorite.filter((city) => {
      return city.id !== id;
    });
    setFavorite(newFavoriteList);
    localStorage.setItem("saveFavoriteCity", JSON.stringify(newFavoriteList));
  };

  return (
    <Grid item xs={1} sm={1} md={2}>
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
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Your favorite city has been saved.
            </Alert>
          </Snackbar>
          <Drawer
            anchor={anchor}
            open={menu[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <Box
              component="form"
              sx={{
                p: "5px 10px",
                display: "flex",
                alignItems: "center",
                width: 400,
                margin: "20px 0",
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
                aria-label="search"
                onClick={() => {
                  setCity(currentPosition);
                }}
              >
                <SearchIcon />
              </IconButton>
            </Box>
            {favorite.map((favorite, index) => {
              return (
                <Paper
                  key={index}
                  elevation={2}
                  style={{
                    margin: "10px ",
                    backgroundColor: "#A8A8A8",
                    height: "auto",
                    width: "352px",
                  }}
                >
                  {" "}
                  <Typography style={{ textAlign: "end" }}>
                    <IconButton onClick={() => deleteFavoriteCity(favorite.id)}>
                      <Clear color="disabled" fontSize="small" />
                    </IconButton>
                  </Typography>
                  <Typography
                    variant="h3"
                    style={{
                      margin: "5px 25px",
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
  );
}
export default Menu;

import { Grid, IconButton, Link, Typography } from "@mui/material";
import React from "react";
import { LinkedIn } from "@mui/icons-material";
import GitHubIcon from "@mui/icons-material/GitHub";

function Links() {
  return (
    <Grid item xs={12} sx={{ textAlign: "center" }}>
      <>
        <Typography>Feito por Thaís Braga Breder</Typography>
        <Link href="https://github.com/thaisbbreder" onClick={() => {}}>
          <IconButton type="button" aria-label="search" sx={{ color: "white" }}>
            <GitHubIcon />
          </IconButton>
        </Link>
        <Link
          href="https://www.linkedin.com/in/thaisbbreder/"
          onClick={() => {}}
        >
          <IconButton type="button" sx={{ color: "white" }} aria-label="search">
            <LinkedIn />
          </IconButton>
        </Link>
      </>
    </Grid>
  );
}

export default Links;

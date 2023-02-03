import { Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";

function ConvertTemp(props) {
  const { toFahrenheit } = props;

  return (
    <Grid item xs={1} sm={1} md={2}>
      <Stack direction="row" alignItems="center" justifyContent="flex-end">
        <Button
          variant="text"
          sx={{ color: "#FFFF", padding: "5px" }}
          onClick={toFahrenheit}
        >
          <Typography variant="h4back"> ºC | ºF </Typography>
        </Button>
      </Stack>
    </Grid>
  );
}

export default ConvertTemp;

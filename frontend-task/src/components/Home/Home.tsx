import React from "react";
import { Button, Grid, Typography, Container } from "@mui/material";
import { PAGE_PATH } from "../../constants/navigationConstants";

const Home: React.FC = () => {
  const heading = "Zezamii Frontend Task";

  return (
    <Container maxWidth="sm" style={{ marginTop: "5rem" }}>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        {heading}
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button
            href={PAGE_PATH.PRODUCTS}
            variant="contained"
            size="large"
            color="primary"
          >
            Continue
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;

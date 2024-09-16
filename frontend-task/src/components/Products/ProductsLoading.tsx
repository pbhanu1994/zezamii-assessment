import React from "react";
import { Grid, Card, CardContent, Skeleton } from "@mui/material";

export const ProductsLoading = () => {
  const skeletonArray = Array.from(new Array(8));

  return (
    <React.Fragment>
      {skeletonArray.map((_, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={index}
          aria-label={`productLoading-${index}`}
        >
          <Card
            sx={{
              maxWidth: 345,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Skeleton variant="rectangular" width="100%" height={200} />
            <CardContent>
              <Skeleton variant="text" width="60%" height={30} />
              <Skeleton variant="text" width="40%" height={20} />
              <Skeleton variant="text" width="100%" height={60} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </React.Fragment>
  );
};

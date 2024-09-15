import React, { useState } from "react";
import { Container, TextField, Typography } from "@mui/material";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>
      <TextField
        label="Search Products"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
    </Container>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { Product } from "./types/Product";
import getProducts from "./services/services";

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Fetch the products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      const products: Product[] = await getProducts();

      setProducts(products);
      setFilteredProducts(products);
    };

    fetchProducts();
  }, []);

  // Filter products based on search term
  useEffect(() => {
    const filtered = products.filter(({ title }) =>
      title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

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
      <Grid container spacing={3}>
        {filteredProducts.map(
          ({ id, title, description, price, thumbnail }) => (
            <Grid item xs={12} sm={6} md={4} key={id}>
              <Card sx={{ maxWidth: 345, height: 380 }}>
                <CardMedia
                  component="img"
                  alt={`img-${title}`}
                  height="140"
                  image={thumbnail}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    ${price}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>
    </Container>
  );
};

export default App;

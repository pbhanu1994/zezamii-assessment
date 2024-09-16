import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Pagination,
} from "@mui/material";
import { ProductsLoading } from "./ProductsLoading";
import { Product } from "../../types/Product";
import getProducts from "../../services/products";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const PRODUCTS_PER_PAGE = 10;

  // Fetch the products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products: Product[] = await getProducts();
        setProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search term
  useEffect(() => {
    const filtered = products.filter(({ title }) =>
      title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm, products]);

  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <Container sx={{ paddingTop: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        Product List
      </Typography>
      <TextField
        label="Search Products"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginBottom: "30px" }}
      />
      {currentProducts.length > 0 && (
        <Grid container justifyContent="space-between">
          <Typography variant="h6" gutterBottom>
            Showing {currentProducts.length} product
            {currentProducts.length === 1 ? "" : "s"}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Page {currentPage}/
            {Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)}
          </Typography>
        </Grid>
      )}
      <Grid container spacing={4}>
        {loading ? (
          <ProductsLoading />
        ) : currentProducts.length > 0 ? (
          currentProducts.map(
            ({ id, title, description, price, thumbnail }) => (
              <Grid item xs={12} sm={6} md={4} key={id}>
                <Card
                  sx={{
                    maxWidth: 345,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    alt={`img-${title}`}
                    height="200"
                    image={thumbnail}
                    sx={{
                      objectFit: "contain",
                      padding: "20px",
                      backgroundColor: "#f9f9f9",
                    }}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{ fontWeight: 600 }}
                    >
                      {title}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{ color: "primary.main", fontWeight: 500 }}
                    >
                      ${price.toFixed(2)}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        height: 100,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )
          )
        ) : (
          <Typography
            variant="h6"
            gutterBottom
            sx={{ paddingTop: 14, textAlign: "center", width: "100%" }}
          >
            No Products found
          </Typography>
        )}
      </Grid>
      {!loading && filteredProducts.length > PRODUCTS_PER_PAGE && (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          sx={{ marginTop: 4, display: "flex", justifyContent: "center" }}
        />
      )}
    </Container>
  );
};

export default Products;

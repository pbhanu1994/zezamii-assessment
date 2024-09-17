import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProductsLoading } from "./ProductsLoading";
import Products from "./Products";
import getProducts from "../../services/products";
import { mockProducts } from "../../mocks/products";

// Mocking the getProducts service
jest.mock("../../services/products");

describe("Products Component", () => {
  beforeEach(() => {
    (getProducts as jest.Mock).mockResolvedValue(mockProducts);
  });

  // Testing the Products - skeleton loading component
  test("renders loading state initially", () => {
    render(<ProductsLoading />);

    // Checking if the skeleton loading cards are rendered
    const skeletonLoadingCard1 = screen.getByLabelText(/productLoading-1/i);
    const skeletonLoadingCard2 = screen.getByLabelText(/productLoading-2/i);

    expect(skeletonLoadingCard1).toBeInTheDocument();
    expect(skeletonLoadingCard2).toBeInTheDocument();
  });

  // Testing the Products - displaying products
  test("fetches and displays products", async () => {
    render(<Products />);

    // Wait for the products to be fetched and rendered
    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
      expect(screen.getByText("Product 3")).toBeInTheDocument();
    });
  });

  // Testing the Products - filtering products based on search term
  test("filters products based on search term", async () => {
    render(<Products />);

    // Wait for products to be displayed
    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
      expect(screen.getByText("Product 3")).toBeInTheDocument();
    });

    // Filtering products
    fireEvent.change(screen.getByLabelText(/Search Products/i), {
      target: { value: "Product 1" },
    });

    // Checking if only Product 1 is displayed
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.queryByText("Product 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Product 3")).not.toBeInTheDocument();
  });

  // Displaying "No Products found" message when there are no products on given title
  test("shows no products found message when no products match", async () => {
    render(<Products />);

    // Wait for products to be displayed
    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
      expect(screen.getByText("Product 3")).toBeInTheDocument();
    });

    // Filtering products with wrong product title
    fireEvent.change(screen.getByLabelText(/Search Products/i), {
      target: { value: "Product 19" },
    });

    // Wait for the "No Products found" message to be displayed
    await waitFor(() => {
      expect(screen.getByText(/No Products found/i)).toBeInTheDocument();
    });
  });
});

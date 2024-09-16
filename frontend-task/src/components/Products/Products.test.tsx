import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProductsLoading } from "./ProductsLoading";

describe("Products Component", () => {
  // Testing the Products - skeleton loading component
  test("renders loading state initially", () => {
    render(<ProductsLoading />);

    // Checking if the button is rendered
    const skeletonLoadingCard1 = screen.getByLabelText(/productLoading-1/i);
    const skeletonLoadingCard2 = screen.getByLabelText(/productLoading-2/i);

    expect(skeletonLoadingCard1).toBeInTheDocument();
    expect(skeletonLoadingCard2).toBeInTheDocument();
  });
});

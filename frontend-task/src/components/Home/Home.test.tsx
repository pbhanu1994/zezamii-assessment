import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./Home";
import { PAGE_PATH } from "../../constants/navigationConstants";

describe("Home Component", () => {
  test("renders heading", () => {
    render(<Home />);

    // Check if the heading is rendered
    expect(screen.getByText(/Zezamii Frontend Task/i)).toBeInTheDocument();
  });

  test("renders Continue button with correct link", () => {
    render(<Home />);

    // Checking if the button is rendered
    const button = screen.getByLabelText(/Continue to products/i);
    expect(button).toBeInTheDocument();

    // Checking if the button has the correct link
    expect(button).toHaveAttribute("href", PAGE_PATH.PRODUCTS);
  });
});

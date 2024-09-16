import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./Home";

describe("Home Component", () => {
  test("renders heading", () => {
    render(<Home />);

    // Check if the heading is rendered
    expect(screen.getByText(/Zezamii Frontend Task/i)).toBeInTheDocument();
  });
});

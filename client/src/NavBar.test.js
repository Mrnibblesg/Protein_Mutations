import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar";

test("NavBar renders", () => {
  render(<NavBar />, { wrapper: BrowserRouter });
  expect(screen.getByText("Protein Mutations")).toBeInTheDocument();
  expect(screen.getByText("Dashboard")).toBeInTheDocument();
  expect(screen.getByText("Info")).toBeInTheDocument();
});

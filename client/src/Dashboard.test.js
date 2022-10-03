import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dashboard from "./Dashboard";

test("dashboard renders", () => {
  render(<Dashboard />);
  const dashboard = screen.getByTestId("dashboard");
  expect(dashboard).toBeInTheDocument();
});

test("Search TextField renders", () => {
  render(<Dashboard />);
  const searchField = screen.getByTestId("search-field");
  expect(searchField).toBeInTheDocument();
});

test("Search for valid protein", () => {
  render(<Dashboard />);
  // Non-matching element is on the screen before typing
  // expect(screen.getAllByText(/n9m1/i)[0]).toBeInTheDocument();

  const searchField = screen.getByTestId("search-field");
  userEvent.type(searchField, "1l2y");
  expect(screen.getByTestId("search-field")).toHaveValue("1l2y");
  // The searched for element is on the screen
  expect(screen.getAllByText(/1l2y/i)[0]).toBeInTheDocument();
  // A non-matching protein is not on the screen
  expect(screen.queryByText(/n9m1/i)).not.toBeInTheDocument();
});

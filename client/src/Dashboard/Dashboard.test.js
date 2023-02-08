import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./Dashboard";

const testProtein = [
  {
    _id: "635f140122a1f757d1191395",
    pdb_id: "1crn",
    type: "pairwise",
    residue_count: 46,
  },
  {
    _id: "635f11d822a1f757d119138e",
    pdb_id: "1l2y",
    type: "pairwise",
    residue_count: 20,
  },
];

test("dashboard renders", () => {
  render(<Dashboard proteins={testProtein} />, { wrapper: BrowserRouter });
  const dashboard = screen.getByTestId("dashboard");
  expect(dashboard).toBeInTheDocument();
});

test("Search TextField renders", () => {
  render(<Dashboard proteins={testProtein} />, { wrapper: BrowserRouter });
  const searchField = screen.getByTestId("search-field");
  expect(searchField).toBeInTheDocument();
});

test("Search bar can be edited", () => {
  const { getAllByText } = render(<Dashboard proteins={testProtein} />, { wrapper: BrowserRouter });
  const searchField = screen.getByTestId("search-field");
  userEvent.type(searchField, "1l2y");
  expect(screen.getByTestId("search-field")).toHaveValue("1l2y");
  expect(getAllByText("1l2y")[0]).toBeInTheDocument();
});

test("Searching removes cards", () => {
  const { getAllByText, queryAllByText } = render(<Dashboard proteins={testProtein} />, {
    wrapper: BrowserRouter,
  });
  // Make sure protein to be filtered is in document
  expect(getAllByText("1crn")[0]).toBeInTheDocument();
  const searchField = screen.getByTestId("search-field");
  userEvent.type(searchField, "1l2y");
  expect(queryAllByText("1crn")[0]).toBeFalsy();
});

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { wait } from "@testing-library/user-event/dist/utils";
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

test("Search bar can be edited", async () => {
  render(<Dashboard />);
  const searchField = screen.getByTestId("search-field");
  userEvent.type(searchField, "1l2y");
  expect(screen.getByTestId("search-field")).toHaveValue("1l2y");
  // expect(screen.getByText("1l2y"));
  // // The searched for element is on the screen
  // expect(screen.getAllByText(/gln_3/i)[0]).toBeInTheDocument();
  // // A non-matching protein is not on the screen
  // expect(screen.queryByText(/ile_2/i)).not.toBeInTheDocument();
});
// Non-matching element is on the screen before typing
// expect(screen.getAllByText(/n9m1/i)[0]).toBeInTheDocument();

// const searchField = screen.getByTestId("search-field");
// userEvent.type(searchField, "gln_3");
// expect(screen.getByTestId("search-field")).toHaveValue("gln_3");
// // The searched for element is on the screen
// const thing = screen.findAllByText(/gln_3/i)[0];
// expect(thing).toBeInTheDocument();
// // A non-matching protein is not on the screen
// expect(await screen.findByText(/ile_2/i)).not.toBeInTheDocument();
// });

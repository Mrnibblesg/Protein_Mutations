import { fireEvent, render, screen } from "@testing-library/react";
import ProteinSelector from "./ProteinSelector";
import { Notification, NotificationContext } from "../NotificationContext";
import { useState } from "react";
import { single, pairwise } from "../common/sampleProtein";
import { BrowserRouter, HashRouter, MemoryRouter, Route, Router, Routes } from "react-router-dom";

test("Single type renders correct fields for each mode", () => {
  const Wrapper = () => {
    const [notification, setNotification] = useState(null);
    return (
      <MemoryRouter initialEntries={["/1crn/single"]}>
        <Routes>
          <Route
            path="*"
            element={
              <NotificationContext.Provider value={{ notification, setNotification }}>
                <ProteinSelector protein={single} />
              </NotificationContext.Provider>
            }
          />
        </Routes>
      </MemoryRouter>
    );
  };
  const { getByRole, queryAllByTestId } = render(<Wrapper />);
  fireEvent.click(getByRole("radio", { name: "Insert" }));
  expect(queryAllByTestId("indexTextField").length).toBe(1);
  expect(queryAllByTestId("residueDropdown").length).toBe(1);
  fireEvent.click(getByRole("radio", { name: "Delete" }));
  expect(queryAllByTestId("indexTextField").length).toBe(1);
  expect(queryAllByTestId("residueDropdown").length).toBe(0);
});

test("Pairwise type renders correct fields for each mode", () => {
  const Wrapper = () => {
    const [notification, setNotification] = useState(null);
    return (
      <MemoryRouter initialEntries={["/1crn/pairwise"]}>
        <Routes>
          <Route
            path="*"
            element={
              <NotificationContext.Provider value={{ notification, setNotification }}>
                <ProteinSelector protein={pairwise} />
              </NotificationContext.Provider>
            }
          />
        </Routes>
      </MemoryRouter>
    );
  };
  const { getByRole, queryAllByTestId, debug } = render(<Wrapper />);
  fireEvent.click(getByRole("radio", { name: "Insert" }));
  expect(queryAllByTestId("indexTextField").length).toBe(2);
  expect(queryAllByTestId("residueDropdown").length).toBe(0);
  fireEvent.click(getByRole("radio", { name: "Delete" }));
  expect(queryAllByTestId("indexTextField").length).toBe(2);
  expect(queryAllByTestId("residueDropdown").length).toBe(0);
});

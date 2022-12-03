import { fireEvent, render, screen } from "@testing-library/react";
import ModeRadio from "./ModeRadio.js";

test("Renders", () => {
  const { getByRole } = render(<ModeRadio mode="insert" />);
  expect(getByRole("radio", { name: "Insert" })).toBeInTheDocument();
  expect(getByRole("radio", { name: "Delete" })).toBeInTheDocument();
});

test("Mode changes on input", () => {
  const mockFn = jest.fn((e) => e.target.value);

  // Initial state is insert
  const { getByRole } = render(<ModeRadio mode="insert" handleModeChange={mockFn} />);
  fireEvent.click(getByRole("radio", { name: "Delete" }));
  expect(mockFn.mock.results[0].value).toBe("delete");
});

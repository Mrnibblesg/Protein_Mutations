import { fireEvent, render, screen } from "@testing-library/react";
import ResidueDropdown from "./ResidueDropdown";

test("Renders", () => {
  const { getByTestId } = render(<ResidueDropdown value="" placeholder="Residue" />);
  expect(getByTestId("residueDropdown")).toBeInTheDocument();
});

test("Mode changes on input", () => {
  const mockFn = jest.fn((e) => e.target.value);

  const { getByTestId } = render(<ResidueDropdown value="" handleChange={mockFn} />);
  fireEvent.change(getByTestId("residueDropdown"), { target: { value: "A" } });
  expect(mockFn.mock.results[0].value).toBe("A");
});

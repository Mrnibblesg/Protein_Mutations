import { fireEvent, render, screen } from "@testing-library/react";
import ResidueDropdown from "./ResidueDropdown";

test("Renders", () => {
  const { getByText } = render(<ResidueDropdown placeholder="Residue" />);
  expect(getByText(/residue/i)).toBeInTheDocument();
});

test("Mode changes on input", () => {
  const mockFn = jest.fn((e) => e.target.value);
  const { getByRole } = render(<ResidueDropdown handleChange={mockFn} />);
  fireEvent.change(getByRole("input", { name: "residueField" }), { target: { value: "A" } });
  expect(mockFn.mock.results[0].value).toBe("A");
});

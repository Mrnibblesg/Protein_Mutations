import { render, screen } from "@testing-library/react";
import ProteinCard from "./ProteinCard";

test("renders", () => {
  render(<ProteinCard name="p1yb" />);
  const card = screen.getByTestId("protein-card");
  expect(card).toBeInTheDocument();
});

test("renders title", () => {
  render(<ProteinCard name="p1yb" />);
  const card = screen.getByTestId("protein-card");
  // Check for title
  expect(card).toHaveTextContent("p1yb");
});

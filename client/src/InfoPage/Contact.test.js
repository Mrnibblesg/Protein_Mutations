import { render, screen } from "@testing-library/react";
import Contact from "./Contact";

test("contact renders", () => {
  render(<Contact />);
  expect(screen.getByTitle(/ContactInfo/i)).toBeInTheDocument();
});

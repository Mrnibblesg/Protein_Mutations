import { render, screen } from "@testing-library/react";
import Info from "./Info";

test("Both Contact and References are rendered", () => {
  render(<Info />);
  expect(screen.getByTitle(/ContactInfo/i)).toBeInTheDocument();
  expect(screen.getByTitle(/References/i)).toBeInTheDocument();
});

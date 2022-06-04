import { render, screen } from "@testing-library/react";
import Explanation from "./Explanation";

test("renders learn react link", () => {
  render(<Explanation />);
  // Check for title
  expect(screen.getByTitle(/explanation/i)).toBeInTheDocument();
  expect(screen.getByText(/This is how protein mutation works/i)).toBeInTheDocument();
});

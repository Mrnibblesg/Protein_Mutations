import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  // In regex form, the i at the end means case insensitive
  const linkElement = screen.getByText(/protein mutations/i);
  expect(linkElement).toBeInTheDocument();
});

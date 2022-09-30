import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";

test("dashboard renders", () => {
  const testProteins = [1, 2, 3, 4];
  render(<Dashboard proteins={testProteins} />);
  // Check for title
  const dashboard = screen.getByTestId("dashboard");
  expect(dashboard).toBeInTheDocument();
});

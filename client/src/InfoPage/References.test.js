import References from "./References";
import { render, screen } from "@testing-library/react";

// As a computational biologist, so that I can learn more about this topic, I
// want to be able to see or navigate to all the relevant research that went into this project.
test("References render", () => {
  render(<References />);
  expect(screen.getByTitle(/References/i)).toBeInTheDocument();
  expect(screen.getByText(/Filip Jagodzinski/)).toBeInTheDocument();
});

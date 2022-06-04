import References from "./References";
import { render, screen } from "@testing-library/react";

// As a computational biologist, so that I can learn more about this topic, I
// want to be able to see or navigate to all the relevant research that went into this project.
test("references properly renders", () => {
  render(<References />);
  expect(screen.getByTitle(/References/i)).toBeInTheDocument();
  // Make sure professor's name is in there
  expect(screen.getByText(/Filip Jagodzinzki/i)).toBeInTheDocument();
  // Later on include checks for specific research paper links
});

import { defineFeature, loadFeature } from "jest-cucumber";
import App from "../../App.js";
import { fireEvent, render, screen } from "@testing-library/react";

const feature = loadFeature("src/__tests__/features/heatmap.feature");

defineFeature(feature, (test) => {
  test("Heatmap displays when a protein is selected", ({ given, when, then }) => {
    given("I am on the home page", () => {
      render(<App />);
    });

    when("protein 1csp is selected", () => {
      // Simulate card click
      fireEvent.click(screen.getByTestId("1csp"));
      // Check that url changed
      expect(window.location.href).toBe("https://protein-mutations/proteins/1csp");
    });

    then("the heatmap for that protein is displayed", () => {
      // Later will be testing components of whatever graph library is being used
      expect(screen.findByAltText("1scp heatmap").src).toContain("heatmap");
    });
  });
});

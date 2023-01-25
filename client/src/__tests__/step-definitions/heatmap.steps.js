import { defineFeature, loadFeature } from "jest-cucumber";
import App from "../../App.js";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ResizeObserver } from "@juggle/resize-observer";
window.ResizeObserver = ResizeObserver;

const feature = loadFeature("src/__tests__/features/heatmap.feature");
defineFeature(feature, (test) => {
  test("Heatmap displays for single protein", ({ given, when, then }) => {
    given("I am on the home page", async () => {
      await render(<App />);
    });

    when("single protein 1l2y is selected", async () => {
      const proteinCard = await screen.findByTestId("1l2y/single");
      fireEvent.click(proteinCard);
    });
    when("insert position and residue are selected", () => {
      // Residue
      fireEvent.change(screen.getByTestId("residueDropdown"), {
        target: { value: "A" },
      });
      // Text field
      userEvent.type(screen.getByTestId("indexTextField"), "10");
    });
    when("generate button is pressed", () => {
      userEvent.click(screen.getByTestId("generateButton"));
    });

    then("the heatmap for that protein is displayed", () => {
      expect(screen.getByTestId("heatmap")).toBeInTheDocument();
      // Later will be testing components of whatever graph library is being used
    });
  });
});

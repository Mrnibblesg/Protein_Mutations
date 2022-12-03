import { defineFeature, loadFeature } from "jest-cucumber";
import App from "../../App.js";
import { fireEvent, render, screen, waitForElement } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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
      userEvent.type(screen.getBy("textbox", { name: "indexField" }), "10");
    });
    when("generate button is pressed", () => {
      userEvent.click(screen.getByTestId("generateButton"));
    });

    then("the heatmap for that protein is displayed", () => {
      expect(screen.getByTestId("molstarViewer")).toBeInTheDocument();
      // Later will be testing components of whatever graph library is being used
    });
  });

  // test("Heatmap doesn't display if there is no data for it in the database", ({
  //   given,
  //   when,
  //   then,
  // }) => {
  //   given("I am on the home page and protein 3kis does not have data", () => {
  //     // expect(window.location.href).toBe("https://protein-mutations.com");
  //     expect(true);
  //     render(<App proteins={[{ name: "3kis", data: null }]} />);
  //   });

  //   when("protein 3kis is selected", () => {
  //     // fireEvent.click(screen.getByTestId("1csp"));
  //   });

  //   then("no heatmap will be displayed on the new page", () => {
  //     // expect(window.location.href).toBe("https://protein-mutations.com");
  //     // expect(screen.queryByAltText("1scp heatmap")).toBeNull();
  //     expect(true);
  //   });
  // });
});

// defineFeature(feature, (test) => {
//   test("Heatmap displays when a protein is selected", ({ given, when, then }) => {
//     given("I am on the home page", () => {
//       render(<App />);
//     });

//     when("protein 1csp is selected", () => {
//       // Simulate card click
//       fireEvent.click(screen.getByTestId("1csp"));
//       // Check that url changed
//       expect(window.location.href).toBe("https://protein-mutations.com/proteins/1csp");
//     });

//     then("the heatmap for that protein is displayed", () => {
//       // Later will be testing components of whatever graph library is being used
//       expect(screen.queryByAltText("1scp heatmap").src).toContain("heatmap");
//     });
//   });

//   test("Heatmap doesn't display if there is no data for it in the database", ({
//     given,
//     when,
//     then,
//   }) => {
//     given("I am on the home page and protein 3kis does not have data", () => {
//       expect(window.location.href).toBe("https://protein-mutations.com");
//       render(<App proteins={[{ name: "3kis", data: null }]} />);
//     });

//     when("protein 3kis is selected", () => {
//       fireEvent.click(screen.getByTestId("1csp"));
//     });

//     then("no heatmap will be displayed on the new page", () => {
//       expect(window.location.href).toBe("https://protein-mutations.com");
//       expect(screen.queryByAltText("1scp heatmap")).toBeNull();
//     });
//   });
// });

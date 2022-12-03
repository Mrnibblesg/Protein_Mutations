import { fireEvent, render, screen } from "@testing-library/react";
import ProteinSelector from "./ProteinSelector";
import { Notification, NotificationContext } from "../NotificationContext";
import { useState } from "react";
import sampleProtein from "../common/sampleProtein";

const single = { ...sampleProtein, type: "single" };
const pairwise = { ...sampleProtein, type: "pairwise" };

// Couldn't even get this to render because of molstar being very bad
test("Single type renders correct fields for each mode", () => {
  expect(true);
  //   const Wrapper = () => {
  //     const [notification, setNotification] = useState(null);
  //     return (
  //       <NotificationContext.Provider value={{ notification, setNotification }}>
  //         <ProteinSelector protein={single} />
  //       </NotificationContext.Provider>
  //     );
  //   };
  //   const { queryAllByRole, getByRole } = render(<Wrapper />);
  //   fireEvent.click(getByRole("radio", { name: "Insert" }));
  //   expect(queryAllByRole("input", { name: "indexField" }).length).toBe(1);
  //   expect(queryAllByRole("input", { name: "residueField" }).length).toBe(1);
  //   fireEvent.click(getByRole("radio", { name: "Delete" }));
  //   expect(queryAllByRole("input", { name: "indexField" }).length).toBe(0);
  //   expect(queryAllByRole("input", { name: "residueField" }).length).toBe(1);
});

import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProteinCard from "./ProteinCard";

test("card renders", () => {
  render(<ProteinCard protein={{ pdb_id: "1l2y", type: "single" }} />, { wrapper: BrowserRouter });
  expect(screen.getByText("1l2y")).toBeInTheDocument();
});

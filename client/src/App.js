import { useState } from "react";
import { TextField, ThemeProvider } from "@mui/material";
import "./App.css";
import NavBar from "./NavBar";
import Dashboard from "./Dashboard";
import theme from "./theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Info from "./Info";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NavBar />}>
              <Route index element={<Dashboard />} />
              {/* Add route for proteins */}
              <Route path="/info" element={<Info />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;

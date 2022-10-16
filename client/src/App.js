import { TextField, ThemeProvider } from "@mui/material";
import "./App.css";
import NavBar from "./NavBar";
import Dashboard from "./Dashboard";
import theme from "./theme";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Info from "./Info";
import References from "./References";
import ProteinPage from "./ProteinPage";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="" element={<NavBar />}>
              {/* <Route index element={<Dashboard />} /> */}
              <Route index element={<ProteinPage />} />
              <Route
                path="info"
                element={
                  <div>
                    <Info /> <References />{" "}
                  </div>
                }
              />
              {/* Add route for individual proteins */}
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;

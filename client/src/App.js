import { ThemeProvider } from "@mui/material";
import "./App.css";
import NavBar from "./NavBar";
import Dashboard from "./Dashboard";
import theme from "./theme";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Info from "./Info";
import References from "./References";
import ProteinPageLayout from "./ProteinPageLayout";


function App() {
  const proteins = ["n9m1", "n90a", "is61"];
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="" element={<NavBar />}>
              <Route index element={<Dashboard />} />
              <Route path="info" element={<div><Info /> <References /> </div>} />
              {proteins.map((name) => {
                  return <Route path={name} element={ProteinPageLayout(name)} />
              })}
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;

import { ThemeProvider } from "@mui/material";
import "./App.css";
import NavBar from "./NavBar";
import Dashboard from "./Dashboard";
import theme from "./theme";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Info from "./Info";
import References from "./References";
import { useEffect, useState } from "react";
import axios from "axios";
import ProteinSelector from "./Protein/ProteinSelector";

function App() {
  const [proteins, setProteins] = useState([]);

  // Retrieve data from database
  useEffect(() => {
    const getProteinNames = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/get-basic-proteins");
        setProteins(response.data);
      } catch (error) {
        console.error(error);
        // Notify the user somehow
      }
    };

    getProteinNames();
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="" element={<NavBar />}>
              <Route index element={<Dashboard proteins={proteins} />} />
              <Route
                path="info"
                element={
                  <div>
                    <Info /> <References />{" "}
                  </div>
                }
              />
              {
                //Generate routes from proteins
                proteins.map((protein) => {
                  return (
                    <Route
                      key={protein.pdb_id}
                      path={protein.pdb_id}
                      // element={<ProteinPage {...protein} />}
                      element={<ProteinSelector protein={protein} />}
                    />
                  );
                })
              }
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;

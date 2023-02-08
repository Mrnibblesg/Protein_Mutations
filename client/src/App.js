import { ThemeProvider } from "@mui/material";
import "./App.css";
import NavBar from "./NavBar";
import Dashboard from "./Dashboard/Dashboard";
import theme from "./theme";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import References from "./InfoPage/References";
import { useEffect, useState } from "react";
import axios from "axios";
import ProteinSelector from "./Protein/ProteinSelector";
import { Notification, NotificationContext } from "./NotificationContext";

function App() {
  const [proteins, setProteins] = useState([]);
  const [notification, setNotification] = useState(null);

  // Retrieve data from database
  useEffect(() => {
    const getProteins = async () => {
      try {
        const response = await axios.get("/api/get-basic-proteins");
        setProteins(response.data);
      } catch (error) {
        console.error(error);
        setNotification("There was an issue retrieving proteins");
      }
    };

    getProteins();
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <NotificationContext.Provider value={{ notification, setNotification }}>
          <Router>
            <Routes>
              <Route path="" element={<NavBar />}>
                <Route index element={<Dashboard proteins={proteins} />} />
                <Route path="info" element={<References />} />
                {
                  //Generate routes from proteins
                  proteins.map((protein) => {
                    return (
                      <Route
                        key={protein._id}
                        path={`${protein.pdb_id}/${protein.type}/*`}
                        element={<ProteinSelector protein={protein} />}
                      />
                    );
                  })
                }
              </Route>
            </Routes>
          </Router>
          <Notification />
        </NotificationContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;

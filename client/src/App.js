import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./Dashboard.js";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box.js";
// import Toolbar from "@mui/material/Toolbar.js";

function App() {
  return (
    <div className="App">
      <div style={{ borderBottom: "1px solid black" }}>
        <h1>Protein Mutations</h1>
      </div>
      <Dashboard />
    </div>
  );
}

export default App;

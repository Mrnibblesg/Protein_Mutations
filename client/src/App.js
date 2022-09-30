import {useState} from "react";
import {TextField} from "@mui/material"
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./NavBar";

function App() {
  const [number, setNumber] = useState(5);
  const [letters, setLetters] = useState(["N", "L", "E", "Y", "I"])
  const handleClick = () => {
    // axios.get("localhost:8080/protein-info/get")
  }
  function handleChange(event) {
    
  }

  return (
    <div className="App">
      <NavBar />
      <TextField />
      <h2>{number}</h2>
      {/* <input value={number} onChange={handleChange} /> */}
      {letters.map((letter) => <LetterButton key={letter} letter={letter} />)}
    </div>
  );
}

function LetterButton({letter, handleClick}) {

  // return <button onClick={handleClick} style={{margin: 8, display: "inline", backgroundColor: clicked ? "purple" : undefined}}>{letter}</button>
}

export default App;

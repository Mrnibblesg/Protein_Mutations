import React from "react";

//TODO: Move inline CSS into external CSS file.
export default function Contact() {
  return (
    <footer
      title="ContactInfo"
      style={{
        marginTop: "100px",
        fontSize: "30px",
      }}>
      <h2>Contact Information</h2>
      Filip Jagodzinski
      <br />
      Associate Professor
      <br />
      Department Chair, <a href="https://cs.wwu.edu/">WWU Comp Sci.</a>
      <br />
      filip[.]jagodzinski[at]wwu.edu
      <br />
    </footer>
  );
}

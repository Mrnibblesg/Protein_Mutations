import express from "express";
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("What's up");
});

app.get("/api/test", (req, res) => {
  res.send("This is different");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

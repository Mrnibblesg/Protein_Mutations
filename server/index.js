import mongoose from "mongoose";
import express from "express";
import singleprotein from "./routes/singleprotein.js";
const app = express();
const port = 8080;

app.use(express.json());
app.use("/api", singleprotein);

mongoose
  .connect(
    `mongodb+srv://AdminDB:csci492@cluster0.wj1zjhz.mongodb.net/ProteinMutations?retryWrites=true&w=majority`,
    {}
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });

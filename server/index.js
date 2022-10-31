import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import proteins from "./routes/proteins.js";
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use("/api", proteins);

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

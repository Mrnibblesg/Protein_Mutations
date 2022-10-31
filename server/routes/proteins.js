import express from "express";
import Protein from "../models/protein.js";
import Pairwise from "../models/pairwise.js";

const router = express.Router();

// Return all information about proteins that should be displayed on the dashboard
router.get("/get-basic-proteins", (req, res) => {
  Protein.find({})
    .then((proteins) => {
      res.status(200).send(proteins);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Could not retrieve protein names!");
    });
});

// Currently only works for pairwise
router.post("/get-mutant", (req, res) => {
  const { pdb_id, mode, firstIndex, secondIndex, firstResidue, secondResidue } = req.body;
  let path;
  if (mode === "ins") {
    path = new RegExp(
      `/${pdb_id}\/${mode}\/${firstIndex}\/${firstResidue}\/${secondIndex}\/${secondResidue}/`
    );
  } else if (mode === "del") {
    path = new RegExp(`/\/${pdb_id}\/${mode}\/${firstIndex}\/${secondIndex}\//`);
  } else {
    console.error("Mode not provided");
    return res.status(500).send("Mode not provided");
  }
  Pairwise.findOne({ path })
    .then((protein) => {
      console.log(protein);
      res.status(200).json(protein);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Could not retrieve protein names!");
    });
});

export default router;

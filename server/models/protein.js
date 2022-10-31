import mongoose from "mongoose";

const ProteinSchema = new mongoose.Schema({
  pdb_id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  residue_count: {
    type: Number,
    required: true,
  },
  // Residue list?
});

const protein = mongoose.model("Protein", ProteinSchema, "Proteins");
export default protein;

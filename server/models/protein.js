import mongoose from "mongoose"

const SingleProteinSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    
    // More attributes to be added after demo
});

const protein = mongoose.model("SingleProtein", SingleProteinSchema, "SingleProteins");
export default protein
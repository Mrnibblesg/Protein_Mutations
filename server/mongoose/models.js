const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
    },
    
    // More attributes to be added after demo
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
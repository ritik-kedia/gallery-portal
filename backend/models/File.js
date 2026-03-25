const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: String,
  category: String
});

module.exports = mongoose.model("File", fileSchema);
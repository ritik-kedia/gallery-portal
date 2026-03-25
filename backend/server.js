const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    console.log("Upload folder created");
}

app.use("/uploads", express.static(uploadDir));


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB Connected"))
    .catch(err => console.log(err));


const fileRoutes = require("./routes/fileRoutes");
app.use("/api/files", fileRoutes);
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => console.log("Server running on 5000"));
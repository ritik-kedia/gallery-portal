const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB Connected"))
    .catch(err => console.log(err));


const fileRoutes = require("./routes/fileRoutes");
app.use("/api/files", fileRoutes);
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => console.log("Server running on 5000"));
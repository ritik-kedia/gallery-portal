const express = require("express");
const router = express.Router();
const File = require("../models/File");
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");


router.post("/", auth, upload.single("file"), async (req, res) => {
  const newFile = new File({
    filename: req.file.filename,
    category: req.body.category
  });

  await newFile.save();
  res.json(newFile);
});


router.get("/", async (req, res) => {
  const files = await File.find();
  res.json(files);
});

router.delete("/:id", auth, async (req, res) => {
  await File.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
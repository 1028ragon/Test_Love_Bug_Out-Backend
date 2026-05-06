const express = require("express");
const upload = require("../middlewares/uploadMiddleware");
const { analyzePest } = require("../controllers/pestController");

const router = express.Router();

router.post("/analyze", upload.single("image"), analyzePest);

module.exports = router;
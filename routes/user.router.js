const express = require("express");
const cors = require("cors");
const authenticateJWT = require("../config/authorization");
const { Register } = require("../controllers/auth.controllers");
const { Login } = require("../controllers/auth.controllers");


const router = express.Router();
require("dotenv").config();

router.use(cors());

/*
 *@auth controllers
 *@public
 *@method post
 */
router.post("/register", Register);
router.post("/login", Login);

module.exports = router;

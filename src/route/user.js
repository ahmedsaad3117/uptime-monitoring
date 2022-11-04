const express = require("express");

const auth = require("../middleware/auth");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/users/signup", userController.signup);

router.get("/users/confirm-email", userController.confirmEmail); 

router.get("/users", auth, userController.authTask); // test delete at the end

router.get("/users/me", auth, userController.me); // test delete at the end

router.get("/users/login", userController.login); 

module.exports = router;

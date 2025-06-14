const { Router } = require("express");
const { Register, Login } = require("../controllers/user.controller.js");

const router = Router();

router.post("/login", Login);
router.post("/signup", Register);
// router.get("/addActivity");
// router.get("/getActivity");

module.exports = router;

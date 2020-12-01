var express = require("express");
var router = express.Router();

const userController = require("../controllers/userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//user create route
router.post("/create", userController.createUser);

//user update route
router.put("/update/:id", userController.updateUser);

//user delete route

router.delete("/delete/:id", userController.deleteUser);

module.exports = router;

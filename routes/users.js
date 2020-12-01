var express = require("express");
const { route } = require(".");
var router = express.Router();

const userController = require("../controllers/userController");

/* GET users listing. */
router.get("/", userController.getUsers);

//get users by coordinates
router.get("/coordinates", userController.getUserByCoordinates);

//get users by time stamps
router.get("/time", userController.getUsersByTimeStamps);
//user create route
router.post("/create", userController.createUser);

//user update route
router.put("/update/:id", userController.updateUser);

//user delete route

router.delete("/delete/:id", userController.deleteUser);

module.exports = router;

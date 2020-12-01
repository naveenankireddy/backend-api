const User = require("../models/User");

const userController = {
  //create user and mobile must be uniquie
  createUser: async (req, res) => {
    const { name, mobile, address } = req.body;

    if (!name || !mobile || !address) {
      return res.status(422).json({ error: "Please provide all fileds" });
    }
    await User.findOne({ mobile: mobile }).then((savedUser) => {
      if (savedUser) {
        res.status(422).json({ error: "mobile number is already taken" });
      }
      const user = new User({
        name,
        mobile,
        address,
      });
      user
        .save()
        .then((data) => {
          res.status(200).json({ user: data });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },

  //update the existing user
  updateUser: async (req, res) => {
    await User.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
      User.findOne({ _id: req.params.id }).then((data, err) => {
        if (err) {
          res.status(500).json({
            error: "something went wrong",
          });
        } else {
          res.status(200).send({
            message: "updated successfully",
            data,
          });
        }
      });
    });
  },
  //delete the user
  deleteUser: async (req, res) => {
    await User.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(200).json({
          message: "Deleted!",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  },
};

module.exports = userController;

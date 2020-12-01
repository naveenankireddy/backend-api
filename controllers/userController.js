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

  //get all the users
  getUsers: async (req, res) => {
    User.find({}).then((users) => {
      res.json({ users });
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
  //   get users by coordinates
  getUserByCoordinates: async (req, res) => {
    await User.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
          },
          maxDistance: 10000000,
          distanceField: "distance",
          spherical: true,
        },
      },
    ])
      .then((users) => {
        res.status(200).send(users);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  //get users by timestamps
  getUsersByTimeStamps: async (req, res) => {
    await User.find({}, null, { sort: { date: -1 } }, function (err, users) {
      if (err) {
        console.log(err);
      } else {
        res.json({ users });
      }
    });
  },
};

module.exports = userController;

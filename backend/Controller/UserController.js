import User from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const UserController = {
    // All Users:
    async getAllUsers(req, res) {
      try {
        let allUsers = await User.find();
        res.json(allUsers);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },
    // By Id:
    async getUserById(req, res) {
      try {
        let oneUser = await User.find({ _id: req.params.id });
        console.log(oneUser)
        res.json(oneUser);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },

    // Login:
    async loginUser(req, res) {
      let { email, password } = req.body;

      let user = await User.findOne({ email });

      if (!user) {
        res.json({ message: "User not found!" });
      }

      let validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        res.json({ message: "Invalid password!" });
      }

      let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: "30d",
      });
      res.json({ token, user });
    },

    // SignUp:
    async createUser(req, res) {
      let { name, email, password, profilePicture, age, role } = req.body;

      const newUser = new User({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        profilePicture,
        age,
        role,
      });

      try {
        let savedUser = await newUser.save();

        let Res = {
          token: jwt.sign({ id: savedUser.id }, process.env.SECRET_KEY, {
            expiresIn: "30d",
          }),
          user: savedUser,
        };
        res.status(201).json(Res);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },

    async updateUser(req, res) {
      try {
        let updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
        res.json(updatedUser);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },
    async deleteUser(req, res) {
      try {
        let deleted = await User.findByIdAndDelete(req.params.id);
        res.json(deleted);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },
  };


  export default UserController;
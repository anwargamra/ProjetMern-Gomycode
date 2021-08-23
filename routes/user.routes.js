const router = require("express").Router();
const User = require("../models/user.model");

const { registerRules, validator } = require("../middleware/validator")
const {isAuth}=require("../middleware/passport")

const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require('../controllers/upload.controller');
const multer = require("multer");
const upload = multer(); //uploading files

// auth
router.post("/register",registerRules(), validator, authController.signUp);
router.post("/login", authController.signIn);
//router.post("/login/admin", authController.signIn);

router.get("/logout", authController.logout);


// user DB

router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.get("/pseudo/:pseudo",userController.userpseudo);
router.get("/fr", async (req, res) => {
    const userId = req.query.id;
    const username = req.query.pseudo;
    try {
      const user = userId
        ? await User.findById(userId)
        : await User.findOne({ username: username });
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

// upload
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;

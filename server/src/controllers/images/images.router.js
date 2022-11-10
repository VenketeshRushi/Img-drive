let express = require("express");
let multer = require("multer");
const authorization = require("../../middlewares/authorization");
const User = require("../user/user.model");
let app = express.Router();

const DIR = "./public/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + fileName);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

app.post(
  "/",
  authorization,
  upload.single("imgCollection"),
  async (req, res) => {
    console.log(req.user._id);
    const url = "https://imguploads.herokuapp.com/"
    let imgurl = url + `/public/` + req.file.filename;
    //console.log(req.file);
    try {
      let user = await User.updateOne(
        { _id: req.user._id },
        { $push: { imgCollection: imgurl } }
      );
      res.status(201).json({
        message: "Done upload!",
        userCreated: {
          _id: user,
        },
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  }
);

app.get("/", async (req, res) => {
  let data;
  try {
    let useresimg = await User.find(
      { _id: req.headers.authorization },
      { imgCollection: 1 }
    );
    //console.log(useresimg)
    data = useresimg[0].imgCollection;
    //console.log(data)
    res.status(200).send(data);
  } catch (error) {
    res.send(error.message);
  }
});

app.post("/del", async (req, res) => {
  console.log(req.headers.authorization);
  console.log(req.body.img);
  try {
    let delimg = await User.updateOne(
      { _id: req.headers.authorization },
      { $pull: { imgCollection: req.body.img } }
    );
    console.log(delimg);
    res.send(delimg);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = app;

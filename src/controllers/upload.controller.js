const { upload, remove } = require("../config/cloudinary");
const uploadTransformer = require("../transformers/upload.transformer");

exports.upload = async (req, res) => {
  try {
    if (req.body.image) {
      const data = await upload(req, res);
      res.send(await new uploadTransformer().transform(data));
    } else {
      res.status(201).status(402).send("Plz send valid image");
    }
  } catch (error) {
    res.status(411).send(error);
  }
};

exports.remove = async (req, res) => {
  try {
    const data = await remove(req, res);
    res.send(data);
  } catch (error) {
    res.status(411).send(error);
  }
};

const TransformerAbstract = require("./base.transformer");

class uploadTransformer extends TransformerAbstract {
  _map(file) {
    return {
      id: file.public_id,
      file_type: file.resource_type,
      type: file.format,
      url: file.secure_url,
      createdAt: file.createdAt,
    };
  }
}

module.exports = uploadTransformer;

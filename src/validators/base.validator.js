const { ValidationError } = require("jsonschema");

exports.baseValidator = (res) => {
  if (!!res.errors.length) {
    throw new ValidationError(res.errors[0].message);
  } else {
    return res.valid;
  }
};

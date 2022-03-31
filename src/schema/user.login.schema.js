exports.userLoginSchema = {
  type: "object",
  additionalProperties: false,
  required: ["email", "password"],
  properties: {
    email: {
      type: "string",
      email: true,
    },
    password: {
      type: "string",
    },
  },
};

exports.userLoginMobileSchema = {
  type: "object",
  additionalProperties: false,
  required: ["phone"],
  properties: {
    phone: {
      type: "string",
    },
  },
};

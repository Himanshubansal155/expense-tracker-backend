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

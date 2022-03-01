exports.userCreateSchema = {
  type: "object",
  additionalProperties: false,
  required: ["name", "email", "password"],
  properties: {
    name: {
      type: "string",
    },
    email: {
      type: "string",
      email: true,
    },
    password: {
      type: "string",
    },
    address: {
      type: "string",
    },
  },
};

exports.userCreateSchema = {
  type: "object",
  additionalProperties: false,
  required: ["name", "email", "phone", "password"],
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
    phone: {
      type: "string",
    },
  },
};

exports.userUpdateSchema = {
  type: "object",
  additionalProperties: false,
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
    phone: {
      type: "string",
    },
  },
};

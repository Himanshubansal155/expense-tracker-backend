exports.categoryCreateSchema = {
  type: "object",
  additionalProperties: false,
  required: ["title"],
  properties: {
    title: {
      type: "string",
    },
  },
};

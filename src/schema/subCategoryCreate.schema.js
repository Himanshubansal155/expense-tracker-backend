exports.subCategoryCreateSchema = {
  type: "object",
  additionalProperties: false,
  required: ["title", "id"],
  properties: {
    title: {
      type: "string",
    },
    id: {
      type: "string",
    },
  },
};

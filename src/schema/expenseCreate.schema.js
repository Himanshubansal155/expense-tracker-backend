exports.expenseCreateSchema = {
  type: "object",
  additionalProperties: false,
  required: ["title", "categoryId", "amount", "date"],
  properties: {
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
    categoryId: {
      type: "string",
    },
    subCategoryId: {
      type: "string",
    },
    amount: {
      type: "number",
    },
    time: {
      type: "string",
    },
    date: {
      type: "string",
    },
    meta: {
      type: "object",
      additionalProperties: false,
      required: ["id", "file_type", "url", "type"],
      properties: {
        id: {
          type: "string",
        },
        file_type: {
          type: "string",
        },
        url: {
          type: "string",
        },
        type: {
          type: "string",
        },
      },
    },
  },
};

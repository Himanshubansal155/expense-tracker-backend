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
    date: {
      type: "string",
    },
    meta: {
      type: "object",
      additionalProperties: false,
      required: ["file_id", "file_type", "file_url", "type"],
      properties: {
        file_id: {
          type: "string",
        },
        file_type: {
          type: "string",
        },
        file_url: {
          type: "string",
        },
        type: {
          type: "string",
        },
      },
    },
  },
};

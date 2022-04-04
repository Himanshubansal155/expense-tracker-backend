exports.monthBudgetSchema = {
  type: "object",
  additionalProperties: false,
  required: ["month", "amount", "year"],
  properties: {
    month: {
      type: "number",
    },
    amount: {
      type: "number",
    },
    year: {
      type: "number",
    },
  },
};

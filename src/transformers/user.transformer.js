const TransformerAbstract = require("./base.transformer");

class userTransformer extends TransformerAbstract {
  _map(user) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      totalExpense: user.totalExpense,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}

module.exports = userTransformer;

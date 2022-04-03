//Error codes

exports.ErrorCodes = {
  userNotFound: 101,
  userNotValid: 102,
  userPasswordIncorrect: 103,
  userCreateValidation: 104,
  userLoginValidation: 105,

  //expenses
  expenseDataNotValid: 201,
  expenseCreateValidation: 202,
  expenseNotFound: 203,

  //categories
  categoryDataNotValid: 301,
  categoryCreateValidation: 302,
  categoryUserNotValidOrFound: 303,

  //sub-categories
  subCategoryDataNotValid: 401,
  subCategoryCreateValidation: 402,
  subCategoryUserNotValidOrFound: 403,

  //JWT
  jwtTokenExpire: 9101,
};

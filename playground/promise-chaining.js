require("../src/db/mongoose");
const User = require("../src/models/user");

//5f7d310fa5cec642cc25c897

User.findByIdAndUpdate("5f7ded09f8859945e5b1a38b", { age: 1 })
  .then((user) => {
    console.log(user);
    return User.countDocuments({ age: 1 });
  })
  .then((res) => console.log(res))
  .catch((e) => console.log(e));

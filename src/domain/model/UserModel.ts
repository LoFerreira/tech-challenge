import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: { type: "String" },
  name: { type: "String", required: true },
  email: { type: "String", required: true, unique: true },
  cpf: {
    type: String,
    required: true,
    // validate: {
    //   validator: function (v) {
    //     return /^\d{11}$/.test(v); // Ensures the CPF is exactly 11 digits
    //   },
    //   message: (props) => `${props.value} is not a valid CPF number!`,
    // },
    unique: true,
  },
});

const users = mongoose.model("users", UserSchema);

export default users;

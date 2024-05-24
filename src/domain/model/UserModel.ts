import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - cpf
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         cpf:
 *           type: string
 *           description: The cpf of the user
 *       example:
 *         id: d5fE_asz,
 *         name: Harry Potter and the Goblet of Fire,
 *         email: emailtest123@gmail.com,
 *         cpf: 00000000,
 */

const UserSchema = new mongoose.Schema({
  id: { type: "String" },
  name: { type: "String", required: true },
  email: { type: "String", required: true, unique: true },
  cpf: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{11}$/.test(v); // Ensures the CPF is exactly 11 digits
      },
      message: (props) => `${props.value} is not a valid CPF number!`,
    },
    unique: true,
  },
});

const users = mongoose.model("users", UserSchema);

export default users;

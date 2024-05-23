import express, { Request, Response } from "express";
import users from "../../../../domain/user/model";

const router = express.Router();
class UserController {
  /**
   * @swagger
   * /api/users:
   *   post:
   *     summary: Retrieve a list of users
   *     description: Retrieve a list of users from the database
   *     responses:
   *       200:
   *         description: A list of users
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: "../../../../domain/user/model.ts"
   */
  static createUser = async (req: Request, res: Response) => {
    let user = new users(req.body);

    try {
      const savedUser = await user.save();
      res.status(201).send(savedUser.toJSON());
    } catch (err: any) {
      res
        .status(500)
        .send({ message: `${err.message} - Failure to register user.` });
    }
  };

  static getUserByCPF = async (req: Request, res: Response) => {
    const { cpf } = req.query;
    try {
      const productsByCPF = await users.find({ cpf }, {});
      res.status(200).send(productsByCPF);
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  };
}

router.get("/users/:cpf", UserController.getUserByCPF);
router.post("/users", UserController.createUser);

export default router;

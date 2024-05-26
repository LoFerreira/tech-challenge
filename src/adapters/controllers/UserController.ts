import express, { Request, Response } from "express";
import UserService from "../../domain/service/UserService"; // Importando o serviço
import cpfValidatorMiddleware from "../middleware/cpfValidator";

const router = express.Router();

/*[APIS USUÁRIOS] */
class UserController {
  /*[CRIAR USUÁRIO : FROM BODY] */
  static createUser = async (req: Request, res: Response) => {
    try {
      // Chamando o método do serviço para criar um usuário
      const savedUser = await UserService.createUser(req.body);
      res.status(201).send(savedUser);
    } catch (err: any) {
      res
        .status(500)
        .send({ message: `${err.message} - Failure to register user.` });
    }
  };

  /*[BUSCA USUÁRIO PELO CPF : FROM PARAMS] */
  static getUserByCPF = async (req: Request, res: Response) => {
    const { cpf } = req.params;
    try {
      if (typeof cpf !== "string") {
        throw new Error("CPF must be a string");
      }
      // Chamando o método do serviço para encontrar usuários por CPF
      const usersByCPF = await UserService.getUserByCPF(cpf);
      res.status(200).send(usersByCPF);
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  };
}

/*DEFININDO OS ENDPOINTS*/

router.get("/users/:cpf", cpfValidatorMiddleware, UserController.getUserByCPF);
router.post("/users", cpfValidatorMiddleware, UserController.createUser);

export default router;

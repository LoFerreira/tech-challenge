import express, { Request, Response } from "express";
import { createUserUseCase, getUserByCpfUseCase } from "../../config/di/container"; // Importando os use cases diretamente
import { UserDTO } from "../dtos/UserDTO";

const router = express.Router();

/*[APIS USUÁRIOS] */
class UserController {
  /*[CRIAR USUÁRIO : FROM BODY]
    Cria um novo usuário com base nos dados enviados no corpo da requisição.
  */
  static createUser = async (req: Request, res: Response) => {
    try {
      // Chamando diretamente o use case para criar o usuário, passando o DTO
      const userDTO: UserDTO = await createUserUseCase.execute(req.body);
      res.status(201).send(userDTO);
    } catch (err: any) {
      res.status(500).send({ message: `${err.message} - Failure to register user.` });
    }
  };

  /*[BUSCA USUÁRIO PELO CPF : FROM PARAMS]
    Busca um usuário pelo CPF fornecido nos parâmetros da requisição.
  */
  static getUserByCPF = async (req: Request, res: Response) => {
    const { cpf } = req.params;
    try {
      if (typeof cpf !== "string") {
        throw new Error("CPF must be a string");
      }
      // Chamando diretamente o use case para buscar o usuário pelo CPF
      const userDTO: UserDTO | null = await getUserByCpfUseCase.execute(cpf);
      if (userDTO) {
        res.status(200).send(userDTO);
      } else {
        res.status(404).send({ message: "User not found" });
      }
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  };
}

/*DEFININDO OS ENDPOINTS*/
router.get("/users/:cpf", UserController.getUserByCPF);
router.post("/users", UserController.createUser);

export default router;

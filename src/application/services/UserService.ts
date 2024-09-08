import { CreateUserUseCase } from '../../core/use_cases/CreateUserUseCase';
import { GetUserByCpfUseCase } from '../../core/use_cases/GetUserByCpfUseCase';

/**
 * Serviço para manipulação de usuários.
 */
class UserService {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUserByCpfUseCase: GetUserByCpfUseCase
  ) {}

  /**
   * Cria um novo usuário.
   * @param userData Dados do usuário.
   * @returns Instância do usuário criado.
   */
  async createUser(userData: { name: string; cpf: string; email: string; }) {
    try {
      return await this.createUserUseCase.execute(userData);
    } catch (err: any) {
      throw new Error(`Failure to register user: ${err.message}`);
    }
  }

  /**
   * Busca um usuário pelo CPF.
   * @param cpf CPF do usuário.
   * @returns Instância do usuário ou null se não encontrado.
   */
  async getUserByCPF(cpf: string) {
    try {
      return await this.getUserByCpfUseCase.execute(cpf);
    } catch (err: any) {
      throw new Error(`Error retrieving user by CPF: ${err.message}`);
    }
  }
}

export default UserService;
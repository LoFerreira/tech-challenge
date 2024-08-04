import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { User } from '../../domain/entities/User';

/**
 * Dados de entrada para criar um novo usuário.
 */
interface CreateUserRequest {
    name: string;
    cpf: string;
    email: string;
}

/**
 * Caso de uso para criar um novo usuário.
 */
export class CreateUserUseCase {
    constructor(private userRepository: IUserRepository) { }

    /**
     * Executa o caso de uso de criação de usuário.
     * @param request Dados para criação do usuário.
     * @returns Instância do usuário criado.
     */
    async execute(request: CreateUserRequest): Promise<User> {
        const { name, cpf, email } = request;

        // Criar uma nova instância do usuário
        const user = new User('generated-id', name, cpf, email);

        // Salvar o usuário no repositório
        return await this.userRepository.create(user);
    }
}
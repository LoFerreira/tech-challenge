import { IUserRepository } from '../../adapters/repositories/IUserRepository';
import { User } from '../entities/User';
import { UserDTO } from '../../adapters/dtos/UserDTO';

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
    constructor(private userRepository: IUserRepository) {}

    /**
     * Executa o caso de uso de criação de usuário.
     * @param request Dados para criação do usuário.
     * @returns Instância do usuário criado.
     */
    async execute(request: CreateUserRequest): Promise<UserDTO> {
        const { name, cpf, email } = request;

        // Criar uma nova instância do usuário (entidade de domínio)
        const user = new User('generated-id', name, cpf, email);

        // Salvar o usuário no repositório
        const savedUser = await this.userRepository.create(user);

        // Retornar um DTO em vez da entidade de domínio
        return {
            id: savedUser._id,
            name: savedUser.name,
            cpf: savedUser.cpf,
            email: savedUser.email,
        };
    }
}

import { IUserRepository } from '../../adapters/repositories/IUserRepository';
import { UserDTO } from '../dtos/UserDTO';
import { User } from '../entities/User';

/**
 * Caso de uso para buscar um usuário pelo CPF.
 */
export class GetUserByCpfUseCase {
    constructor(private userRepository: IUserRepository) {}

    /**
     * Executa o caso de uso de busca de usuário por CPF.
     * @param cpf CPF do usuário.
     * @returns UserDTO contendo os dados do usuário ou null se não encontrado.
     */
    async execute(cpf: string): Promise<UserDTO | null> {
        // Buscar o usuário pelo CPF no repositório
        const user: User | null = await this.userRepository.findByCpf(cpf);
        
        // Se o usuário não for encontrado, retornar null
        if (!user) {
            return null;
        }

        // Converter a entidade User para UserDTO
        const userDTO: UserDTO = {
            id: user.id,
            name: user.name,
            cpf: user.cpf,
            email: user.email
        };

        // Retornar o UserDTO
        return userDTO;
    }
}

import { IUserRepository } from '../../adapters/repositories/IUserRepository';
import { User } from '../entities/User';

/**
 * Caso de uso para buscar um usuário pelo CPF.
 */
export class GetUserByCpfUseCase {
    constructor(private userRepository: IUserRepository) { }

    /**
     * Executa o caso de uso de busca de usuário por CPF.
     * @param cpf CPF do usuário.
     * @returns Instância do usuário ou null se não encontrado.
     */
    async execute(cpf: string): Promise<User | null> {
        return await this.userRepository.findByCpf(cpf);
    }
}

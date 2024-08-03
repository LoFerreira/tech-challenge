import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { User } from '../../domain/entities/User';
import UserModel from '../../infrastructure/frameworks/mongoose/models/UserModel';

/**
 * Implementação concreta do repositório de usuários para MongoDB.
 */
export class MongoUserRepository implements IUserRepository {
    /**
     * Cria um novo usuário no banco de dados.
     * @param user Dados do usuário a ser criado.
     * @returns Instância do usuário criado.
     */
    async create(user: User): Promise<User> {
        const userModel = new UserModel({
            name: user.name,
            cpf: user.cpf,
            email: user.email,
            password: user.password,
        });

        const savedUser = await userModel.save();
        return new User(
            savedUser.id.toString(),
            savedUser.name,
            savedUser.cpf,
            savedUser.email,
            savedUser.password
        );
    }

    /**
     * Busca um usuário pelo CPF.
     * @param cpf CPF do usuário.
     * @returns Instância do usuário ou null se não encontrado.
     */
    async findByCpf(cpf: string): Promise<User | null> {
        const userData = await UserModel.findOne({ cpf }).exec();
        if (!userData) return null;

        return new User(
            userData.id.toString(),
            userData.name,
            userData.cpf,
            userData.email,
            userData.password
        );
    }
}
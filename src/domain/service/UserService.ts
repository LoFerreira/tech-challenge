import User from "../model/UserModel"; // Corrigindo o import aqui


class UserService {

    /*[CRIAR USUÁRIO]*/
    static async createUser(userData: any) {
        try {
            let user = new User(userData); // Corrigindo o uso de 'User' aqui
            const savedUser = await user.save();
            return savedUser.toJSON();
        }
        catch (err: any) {
            throw new Error(`Failure to register user: ${err.message}`);
        }
    }

    /*[BUSCA USUÁRIO COM BASE NO CPF]*/
    static async getUserByCPF(cpf: string) {
        try {
            return await User.find({ cpf }, {});
        }
        catch (err: any) {
            throw new Error(`Error retrieving user by CPF: ${err.message}`);
        }
    }
}

export default UserService;

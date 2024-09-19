/**
 * Entidade que representa um usuário no domínio.
 */
export class User {
    constructor(
        public id: string,
        public name: string,
        public cpf: string,
        public email: string
    ) { }
}
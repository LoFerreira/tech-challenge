// src/Core/Domain/Entities/Cliente.ts

import { Entity } from './Entity';
import { IAggregateRoot } from './IAggregateRoot';
import { validate, IsNotEmpty, IsString, Length, IsEmail, IsBoolean } from 'class-validator';

export class Cliente extends Entity implements IAggregateRoot {
    @IsString({ message: 'O Nome deve ser uma string.' })
    @IsNotEmpty({ message: 'O Nome não pode ser nulo.' })
    @Length(2, 50, { message: 'O Nome precisa ter entre 2 e 50 caracteres.' })
    public nome: string;

    @IsEmail({}, { message: 'O Email está em um formato inválido.' })
    @Length(2, 100, { message: 'O Email precisa ter entre 2 e 100 caracteres.' })
    public email?: string;

    @IsString({ message: 'O CPF deve ser uma string.' })
    @Length(11, 11, { message: 'O CPF precisa ter 11 caracteres.' })
    public cpf: string;

    @IsBoolean({ message: 'O status deve ser um valor booleano.' })
    public ativo: boolean;

    constructor(id: string, nome: string, email: string | undefined, cpf: string, ativo: boolean) {
        super();
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.ativo = ativo;
    }
}

/**
 * Função para validar uma instância de Cliente usando as regras definidas nos decorators.
 * @param cliente - A instância de Cliente a ser validada.
 * @returns Uma promessa com os erros de validação ou um array vazio se estiver tudo correto.
 */
export async function validarCliente(cliente: Cliente): Promise<string[]> {
    const errors = await validate(cliente);
    if (errors.length > 0) {
        return errors.map(err => Object.values(err.constraints || {}).join(', '));
    }
    return [];
}

// src/Adapters/Gateways/Dtos/Request/ClienteRequestDto.ts

import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, Length } from 'class-validator';

/**
 * DTO para a requisição de cliente, contendo validações de dados.
 */
export class ClienteRequestDto {
    @IsUUID('4', { message: 'O campo Id é obrigatório e deve ser um UUID válido.' })
    id!: string;

    @IsString({ message: 'O campo Nome é obrigatório.' })
    @IsNotEmpty({ message: 'O campo Nome é obrigatório.' })
    @Length(2, 50, { message: 'O campo Nome deve conter entre 2 e 50 caracteres.' })
    nome!: string;

    @IsEmail({}, { message: 'E-mail está em um formato inválido.' })
    @Length(5, 100, { message: 'O campo E-mail deve conter entre 5 e 100 caracteres.' })
    @IsOptional() // E-mail é opcional
    email?: string;

    @IsString({ message: 'O campo CPF é obrigatório.' })
    @Length(11, 11, { message: 'O campo CPF deve conter 11 caracteres.' })
    cpf!: string;

    @IsBoolean({ message: 'O campo Ativo é obrigatório e deve ser verdadeiro ou falso.' })
    ativo!: boolean;
}

// src/Adapters/Gateways/Dtos/Request/IdentifiqueSeRequestDto.ts

import { IsString, Length } from 'class-validator';

/**
 * DTO para a requisição de identificação de cliente pelo CPF.
 */
export class IdentifiqueSeRequestDto {
    @IsString({ message: 'O campo CPF é obrigatório.' })
    @Length(11, 11, { message: 'O campo CPF deve conter 11 caracteres.' })
    cpf!: string;
}
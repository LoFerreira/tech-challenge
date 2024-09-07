// src/Adapters/Gateways/Dtos/Request/ProdutoRequestDto.ts

import { IsBoolean, IsDecimal, IsString, IsUUID, Length, Min, Max, IsIn } from 'class-validator';

/**
 * DTO para a requisição de produto.
 */
export class ProdutoRequestDto {
    @IsUUID('4', { message: 'O campo Id é obrigatório e deve ser um UUID válido.' })
    id!: string;

    @IsString({ message: 'O campo Nome é obrigatório.' })
    @Length(2, 40, { message: 'O campo Nome deve conter entre 2 e 40 caracteres.' })
    nome!: string;

    @IsString({ message: 'O campo Descrição é obrigatório.' })
    @Length(5, 200, { message: 'O campo Descrição deve conter entre 5 e 200 caracteres.' })
    descricao!: string;

    @IsDecimal({ decimal_digits: '0,2', force_decimal: false }, { message: 'O campo Preço deve ser um número decimal com até 2 casas decimais.' })
    @Min(1, { message: 'O campo Preço deve ser no mínimo 1.' })
    @Max(9999, { message: 'O campo Preço deve ser no máximo 9999.' })
    preco!: number;

    @IsBoolean({ message: 'O campo Ativo é obrigatório e deve ser verdadeiro ou falso.' })
    ativo!: boolean;

    @IsString({ message: 'O campo Categoria é obrigatório.' })
    @IsIn(['Lanche', 'Acompanhamento', 'Bebida', 'Sobremesa'], { message: 'Categoria inválida. Valores permitidos: Lanche, Acompanhamento, Bebida, Sobremesa.' })
    categoria!: string;
}

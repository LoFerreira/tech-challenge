// src/Adapters/Gateways/Dtos/Request/PedidoRequestDto.ts

import { IsArray, IsInt, IsOptional, IsUUID, Min, Max, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO para a requisição de um pedido.
 */
export class PedidoRequestDto {
    @IsUUID('4', { message: 'O campo PedidoId é obrigatório e deve ser um UUID válido.' })
    pedidoId!: string;

    @IsUUID('4', { message: 'O campo ClienteId deve ser um UUID válido.' })
    @IsOptional()
    clienteId?: string;

    @ValidateNested({ each: true })
    @Type(() => PedidoListaItensDto)
    @IsArray({ message: 'O campo Items deve ser uma lista de itens.' })
    items: PedidoListaItensDto[] = [];
}

/**
 * DTO para os itens do pedido.
 */
export class PedidoListaItensDto {
    @IsUUID('4', { message: 'O campo ProdutoId é obrigatório e deve ser um UUID válido.' })
    produtoId!: string;

    @IsInt({ message: 'O campo Quantidade deve ser um número inteiro.' })
    @Min(1, { message: 'O campo Quantidade deve ser no mínimo 1.' })
    @Max(9999, { message: 'O campo Quantidade deve ser no máximo 9999.' })
    quantidade!: number;
}

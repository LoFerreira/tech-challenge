// src/Adapters/Gateways/Dtos/Request/PedidoStatusRequestDto.ts

import { IsString, IsIn } from 'class-validator';

/**
 * DTO para a requisição de alteração de status de um pedido.
 */
export class PedidoStatusRequestDto {
    @IsString({ message: 'O campo Status é obrigatório.' })
    @IsIn(['EmPreparacao', 'Pronto', 'Finalizado'], { message: 'Status inválido. Valores permitidos: EmPreparacao, Pronto, Finalizado.' })
    status!: string;
}
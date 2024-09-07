// src/Controllers/IPedidoController.ts

import { PedidoRequestDto } from '../Gateways/Dtos/Request/PedidoRequestDto';
import { PedidoStatusRequestDto } from '../Gateways/Dtos/Request/PedidoStatusRequestDto';

export interface IPedidoController {
    /**
     * Obtém todos os pedidos.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em uma string com os detalhes dos pedidos.
     */
    obterTodosPedidosAsync(cancellationToken: AbortSignal): Promise<string>;

    /**
     * Obtém todos os pedidos ordenados.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em uma string com os detalhes dos pedidos ordenados.
     */
    obterTodosPedidosOrdenadosAsync(cancellationToken: AbortSignal): Promise<string>;

    /**
     * Cadastra um novo pedido com base nos dados do DTO.
     * @param pedidoDto - Os dados do pedido a ser cadastrado.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em um booleano indicando sucesso ou falha.
     */
    cadastrarPedidoAsync(pedidoDto: PedidoRequestDto, cancellationToken: AbortSignal): Promise<boolean>;

    /**
     * Altera o status de um pedido.
     * @param pedidoId - O ID do pedido.
     * @param pedidoStatusDto - Os dados do novo status do pedido.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em um booleano indicando sucesso ou falha.
     */
    alterarStatusAsync(pedidoId: string, pedidoStatusDto: PedidoStatusRequestDto, cancellationToken: AbortSignal): Promise<boolean>;
}

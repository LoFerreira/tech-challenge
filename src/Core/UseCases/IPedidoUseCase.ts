// src/Application/Interfaces/IPedidoUseCase.ts

import { Pedido } from '../../xxxdomain/Entities/Pedido';
import { PedidoListaItens } from '../../xxxdomain/ValueObjects/PedidoListaItens';
import { PedidoStatus } from '../../xxxdomain/ValueObjects/PedidoStatus';

export interface IPedidoUseCase {
    /**
     * Obtém todos os pedidos.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa contendo uma string com os pedidos.
     */
    obterTodosPedidosAsync(cancellationToken: AbortSignal): Promise<string>;

    /**
     * Obtém todos os pedidos ordenados.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa contendo uma string com os pedidos ordenados.
     */
    obterTodosPedidosOrdenadosAsync(cancellationToken: AbortSignal): Promise<string>;

    /**
     * Cadastra um novo pedido.
     * @param pedido - O pedido a ser cadastrado.
     * @param itens - A lista de itens do pedido.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa contendo um booleano indicando sucesso ou falha.
     */
    cadastrarPedidoAsync(pedido: Pedido, itens: PedidoListaItens[], cancellationToken: AbortSignal): Promise<boolean>;

    /**
     * Altera o status de um pedido.
     * @param pedidoId - O ID do pedido.
     * @param pedidoStatus - O novo status do pedido.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa contendo um booleano indicando sucesso ou falha.
     */
    alterarStatusAsync(pedidoId: string, pedidoStatus: PedidoStatus, cancellationToken: AbortSignal): Promise<boolean>;
}

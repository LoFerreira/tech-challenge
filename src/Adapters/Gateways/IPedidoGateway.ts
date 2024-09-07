// src/Adapters/Gateways/IPedidoGateway.ts

import { Pedido } from '../../Core/Domain/Entities/Pedido';

/**
 * Interface que define as operações para o gateway de pedidos.
 */
export interface IPedidoGateway {
    /**
     * Verifica se um pedido com o ID fornecido já existe no sistema.
     * @param id - O ID do pedido.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Um booleano indicando se o pedido existe.
     */
    VerificarPedidoExistenteAsync(id: string, cancellationToken?: AbortSignal): Promise<boolean>;

    /**
     * Cadastra um novo pedido no sistema.
     * @param pedido - A entidade Pedido a ser cadastrada.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Um booleano indicando se a operação foi bem-sucedida.
     */
    CadastrarPedidoAsync(pedido: Pedido, cancellationToken?: AbortSignal): Promise<boolean>;

    /**
     * Obtém um pedido pelo ID.
     * @param id - O ID do pedido.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns O pedido correspondente ou null, caso não exista.
     */
    ObterPedidoAsync(id: string, cancellationToken?: AbortSignal): Promise<Pedido | null>;

    /**
     * Atualiza as informações de um pedido existente.
     * @param pedido - A entidade Pedido a ser atualizada.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Um booleano indicando se a operação foi bem-sucedida.
     */
    AtualizarPedidoAsync(pedido: Pedido, cancellationToken?: AbortSignal): Promise<boolean>;

    /**
     * Obtém todos os pedidos ordenados por status e data.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Uma string (ex.: JSON) contendo os pedidos ordenados.
     */
    ObterTodosPedidosOrdenadosAsync(cancellationToken?: AbortSignal): Promise<string>;

    /**
     * Obtém todos os pedidos no sistema.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Uma string (ex.: JSON) contendo todos os pedidos.
     */
    ObterTodosPedidosAsync(cancellationToken?: AbortSignal): Promise<string>;
}

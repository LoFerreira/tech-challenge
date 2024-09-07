// src/Adapters/Gateways/IPagamentoGateway.ts

import { Pagamento } from '../../Core/Domain/Entities/Pagamento';

/**
 * Interface que define as operações para o gateway de pagamentos.
 */
export interface IPagamentoGateway {
    /**
     * Obtém o pagamento associado a um pedido específico.
     * @param pedidoId - O ID do pedido.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns O pagamento correspondente ao pedido ou null, se não existir.
     */
    ObterPagamentoPorPedido(pedidoId: string, cancellationToken?: AbortSignal): Pagamento | null;

    /**
     * Cadastra um novo pagamento no sistema.
     * @param pagamento - A entidade Pagamento a ser cadastrada.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Um booleano indicando se a operação foi bem-sucedida.
     */
    CadastrarPagamentoAsync(pagamento: Pagamento, cancellationToken?: AbortSignal): Promise<boolean>;

    /**
     * Notifica o sistema sobre um pagamento realizado.
     * @param pagamento - A entidade Pagamento que será notificada.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Um booleano indicando se a operação foi bem-sucedida.
     */
    NotificarPagamentoAsync(pagamento: Pagamento, cancellationToken?: AbortSignal): Promise<boolean>;

    /**
     * Gera o QR Code para o pagamento via Pix.
     * @param pagamento - A entidade Pagamento para a qual o QR Code será gerado.
     * @returns O QR Code em formato string.
     */
    GerarQrCodePixGatewayPagamento(pagamento: Pagamento): string;

    /**
     * Obtém o pagamento associado a um pedido específico de forma assíncrona.
     * @param pedidoId - O ID do pedido.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns O pagamento em formato string (ex.: JSON) correspondente ao pedido.
     */
    ObterPagamentoPorPedidoAsync(pedidoId: string, cancellationToken?: AbortSignal): Promise<string>;
}

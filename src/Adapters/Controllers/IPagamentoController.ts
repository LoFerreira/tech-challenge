// src/Controllers/IPagamentoController.ts

export interface IPagamentoController {
    /**
     * Obtém o pagamento associado a um pedido específico.
     * @param pedidoId - O ID do pedido.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em uma string com os detalhes do pagamento.
     */
    obterPagamentoPorPedidoAsync(pedidoId: string, cancellationToken: AbortSignal): Promise<string>;

    /**
     * Realiza o processo de checkout para um pedido específico.
     * @param pedidoId - O ID do pedido.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em um booleano indicando sucesso ou falha.
     */
    efetuarCheckoutAsync(pedidoId: string, cancellationToken: AbortSignal): Promise<boolean>;

    /**
     * Notifica o sistema sobre o pagamento de um pedido.
     * @param pedidoId - O ID do pedido.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em um booleano indicando sucesso ou falha.
     */
    notificarPagamentoAsync(pedidoId: string, cancellationToken: AbortSignal): Promise<boolean>;
}

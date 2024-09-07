// src/Application/Interfaces/IPagamentoUseCase.ts

export interface IPagamentoUseCase {
    /**
     * Obtém o pagamento associado a um pedido específico.
     * @param pedidoId - O ID do pedido.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa contendo a string do pagamento associado ao pedido.
     */
    obterPagamentoPorPedidoAsync(pedidoId: string, cancellationToken: AbortSignal): Promise<string>;

    /**
     * Efetua o checkout de um pedido.
     * @param pedidoId - O ID do pedido.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa contendo um booleano indicando sucesso ou falha.
     */
    efetuarCheckoutAsync(pedidoId: string, cancellationToken: AbortSignal): Promise<boolean>;

    /**
     * Notifica o sistema sobre o pagamento de um pedido.
     * @param pedidoId - O ID do pedido.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa contendo um booleano indicando sucesso ou falha.
     */
    notificarPagamentoAsync(pedidoId: string, cancellationToken: AbortSignal): Promise<boolean>;
}

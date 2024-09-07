// src/Controllers/PagamentoController.ts

import { injectable, inject } from 'tsyringe';
import { IPagamentoUseCase } from '../../Core/UseCases/IPagamentoUseCase';
import { IPagamentoController } from './IPagamentoController';

@injectable()
export class PagamentoController implements IPagamentoController {
    constructor(
        @inject('IPagamentoUseCase') private pagamentoUseCase: IPagamentoUseCase
    ) {}

    /**
     * Realiza o processo de checkout para um pedido específico.
     * @param pedidoId - O ID do pedido.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em um booleano indicando sucesso ou falha.
     */
    public async efetuarCheckoutAsync(pedidoId: string, cancellationToken: AbortSignal): Promise<boolean> {
        return await this.pagamentoUseCase.efetuarCheckoutAsync(pedidoId, cancellationToken);
    }

    /**
     * Notifica o sistema sobre o pagamento de um pedido.
     * @param pedidoId - O ID do pedido.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em um booleano indicando sucesso ou falha.
     */
    public async notificarPagamentoAsync(pedidoId: string, cancellationToken: AbortSignal): Promise<boolean> {
        return await this.pagamentoUseCase.notificarPagamentoAsync(pedidoId, cancellationToken);
    }

    /**
     * Obtém o pagamento associado a um pedido específico.
     * @param pedidoId - O ID do pedido.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em uma string com os detalhes do pagamento.
     */
    public async obterPagamentoPorPedidoAsync(pedidoId: string, cancellationToken: AbortSignal): Promise<string> {
        return await this.pagamentoUseCase.obterPagamentoPorPedidoAsync(pedidoId, cancellationToken);
    }
}

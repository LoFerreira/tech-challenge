// src/External/Infra/Repositories/IPagamentoRepository.ts

import { Repository } from 'typeorm';
import { PagamentoDb } from '../Dto/PagamentoDb';

/**
 * Interface do repositório de pagamentos que estende a funcionalidade genérica do repositório do TypeORM.
 */
export interface IPagamentoRepository extends Repository<PagamentoDb> {
    /**
     * Obtém o pagamento associado a um pedido específico.
     * @param pedidoId - O ID do pedido.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns O status do pagamento como uma string.
     */
    ObterPagamentoPorPedidoAsync(pedidoId: string, cancellationToken?: AbortSignal): Promise<string>;
}

// src/External/Infra/Repositories/PagamentoRepository.ts

import { DataSource } from 'typeorm';
import { PagamentoDb } from '../Dto/PagamentoDb';
import { IPagamentoRepository } from './IPagamentoRepository';
import { Injectable } from 'injection-js';

@Injectable()
export class PagamentoRepository implements IPagamentoRepository {
    private dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }

    /**
     * Obtém o pagamento de um pedido específico pelo ID do pedido.
     * @param pedidoId - O ID do pedido.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns O pagamento do pedido no formato JSON.
     */
    async ObterPagamentoPorPedidoAsync(pedidoId: string, cancellationToken?: AbortSignal): Promise<string> {
        const query = `
            SELECT pedidoId, status, valor, dataPagamento
            FROM Pagamentos
            WHERE PedidoId = @pedidoId
            FOR JSON PATH`;

        // Executa a consulta usando queryRunner ou usando a conexão do TypeORM
        const result = await this.dataSource
            .query(query, { pedidoId }) // Passa o ID do pedido para a consulta
            .catch(() => '[]'); // Retorna um array vazio em caso de erro

        return result && result.length > 0 ? result[0] : '[]';
    }
}

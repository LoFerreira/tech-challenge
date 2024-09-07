// src/External/Infra/Repositories/PedidoRepository.ts

import { DataSource } from 'typeorm';
import { PedidoDb } from '../Dto/PedidoDb';
import { IPedidoRepository } from './IPedidoRepository';
import { Injectable } from 'injection-js';

@Injectable()
export class PedidoRepository implements IPedidoRepository {
    private dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }

    /**
     * Obtém todos os pedidos com seus itens e detalhes em formato JSON.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Todos os pedidos com detalhes no formato JSON.
     */
    async ObterTodosPedidosAsync(cancellationToken?: AbortSignal): Promise<string> {
        const query = `
            SELECT CONVERT(VARCHAR(MAX),(
                (SELECT p.id, p.numeroPedido, p.clienteId, p.status, p.valorTotal, p.dataPedido, Itens.nome, Detalhes.quantidade, Detalhes.valorUnitario
                FROM Pedidos p
                INNER JOIN PedidosItens Detalhes ON p.id = Detalhes.pedidoId
                INNER JOIN Produtos Itens ON Detalhes.produtoId = Itens.id
                FOR JSON AUTO)
            ));`;

        // Executa a consulta SQL diretamente usando TypeORM
        const result = await this.dataSource
            .query(query)
            .catch(() => '[]'); // Retorna array vazio em caso de erro

        return result && result.length > 0 ? result[0] : '[]';
    }

    /**
     * Obtém todos os pedidos filtrados e ordenados por status e data, no formato JSON.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Pedidos ordenados no formato JSON.
     */
    async ObterTodosPedidosOrdenadosAsync(cancellationToken?: AbortSignal): Promise<string> {
        const query = `
            SELECT CONVERT(VARCHAR(MAX),(
                (SELECT p.id, p.numeroPedido, p.status, p.valorTotal, p.dataPedido
                FROM Pedidos p
                WHERE status IN ('Pronto', 'EmPreparacao', 'Recebido')
                ORDER BY 
                    CASE status
                        WHEN 'Pronto' THEN 1
                        WHEN 'EmPreparacao' THEN 2
                        WHEN 'Recebido' THEN 3
                    END,
                    dataPedido ASC
                FOR JSON PATH)
            ));`;

        // Executa a consulta SQL diretamente usando TypeORM
        const result = await this.dataSource
            .query(query)
            .catch(() => '[]'); // Retorna array vazio em caso de erro

        return result && result.length > 0 ? result[0] : '[]';
    }
}

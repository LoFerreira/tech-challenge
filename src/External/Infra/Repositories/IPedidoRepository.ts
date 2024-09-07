// src/External/Infra/Repositories/IPedidoRepository.ts

import { Repository } from 'typeorm';
import { PedidoDb } from '../Dto/PedidoDb';

/**
 * Interface do repositório de pedidos que estende a funcionalidade genérica do repositório do TypeORM.
 */
export interface IPedidoRepository extends Repository<PedidoDb> {
    unitOfWork: any;
    /**
     * Obtém todos os pedidos ordenados de acordo com critérios definidos.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Uma string representando os pedidos ordenados.
     */
    ObterTodosPedidosOrdenadosAsync(cancellationToken?: AbortSignal): Promise<string>;

    /**
     * Obtém todos os pedidos.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Uma string representando todos os pedidos.
     */
    ObterTodosPedidosAsync(cancellationToken?: AbortSignal): Promise<string>;
}

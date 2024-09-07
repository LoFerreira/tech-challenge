// src/External/Infra/Repositories/IClienteRepository.ts

import { Repository } from 'typeorm';
import { ClienteDb } from '../Dto/ClienteDb';

/**
 * Interface do repositório de clientes que estende a funcionalidade genérica do repositório do TypeORM.
 */
export interface IClienteRepository extends Repository<ClienteDb> {
    /**
     * Obtém todos os clientes ativos.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Uma lista de todos os clientes ativos.
     */
    ObterTodosClientesAsync(cancellationToken?: AbortSignal): Promise<ClienteDb[]>;

    /**
     * Identifica um cliente pelo CPF.
     * @param cpf - O CPF do cliente.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns O cliente com o CPF especificado ou null.
     */
    IdentificarClienteCpfAsync(cpf: string, cancellationToken?: AbortSignal): Promise<ClienteDb | null>;
}

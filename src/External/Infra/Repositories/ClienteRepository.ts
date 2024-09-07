// src/External/Infra/Repositories/ClienteRepository.ts

import { Repository, EntityRepository } from 'typeorm';
import { ClienteDb } from '../Dto/ClienteDb';
import { AppDataSource } from '../Migrations/ApplicationDbContextModel';
import { IClienteRepository } from '../Interfaces/IClienteRepository';

@EntityRepository(ClienteDb)
export class ClienteRepository implements IClienteRepository {
    private clienteRepository: Repository<ClienteDb>;

    constructor() {
        // Inicializa o repositório de clientes usando o AppDataSource do TypeORM
        this.clienteRepository = AppDataSource.getRepository(ClienteDb);
    }

    /**
     * Identifica um cliente pelo CPF.
     * @param cpf - O CPF do cliente.
     * @param cancellationToken - Token de cancelamento.
     * @returns O cliente com o CPF especificado ou null.
     */
    async IdentificarClienteCpfAsync(cpf: string, cancellationToken?: AbortSignal): Promise<ClienteDb | null> {
        // Busca um cliente pelo CPF, desabilitando o rastreamento de alterações (AsNoTracking)
        return await this.clienteRepository
            .createQueryBuilder('cliente')
            .where('cliente.cpf = :cpf', { cpf })
            .setAbortSignal(cancellationToken)
            .getOne();
    }

    /**
     * Obtém todos os clientes ativos.
     * @param cancellationToken - Token de cancelamento.
     * @returns Uma lista de todos os clientes ativos.
     */
    async ObterTodosClientesAsync(cancellationToken?: AbortSignal): Promise<ClienteDb[]> {
        // Busca todos os clientes onde Ativo é verdadeiro
        return await this.clienteRepository
            .createQueryBuilder('cliente')
            .where('cliente.ativo = :ativo', { ativo: true })
            .setAbortSignal(cancellationToken)
            .getMany();
    }
}

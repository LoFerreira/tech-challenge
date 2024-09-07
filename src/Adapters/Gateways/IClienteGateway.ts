// src/Adapters/Gateways/IClienteGateway.ts

import { Cliente } from '../../Core/Domain/Entities/Cliente';

/**
 * Interface que define as operações para o gateway de clientes.
 */
export interface IClienteGateway {
    /**
     * Verifica se um cliente existe com base no ID, CPF ou e-mail.
     * @param id - O ID do cliente.
     * @param cpf - O CPF do cliente (opcional).
     * @param email - O e-mail do cliente (opcional).
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Um booleano indicando se o cliente existe.
     */
    VerificarClienteExistente(id: string, cpf?: string, email?: string, cancellationToken?: AbortSignal): boolean;

    /**
     * Verifica se um cliente existe com base no ID.
     * @param id - O ID do cliente.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Um booleano indicando se o cliente existe.
     */
    VerificarClienteExistenteAsync(id: string, cancellationToken?: AbortSignal): Promise<boolean>;

    /**
     * Cadastra um novo cliente no sistema.
     * @param cliente - A entidade Cliente a ser cadastrada.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Um booleano indicando se a operação foi bem-sucedida.
     */
    CadastrarClienteAsync(cliente: Cliente, cancellationToken?: AbortSignal): Promise<boolean>;

    /**
     * Atualiza as informações de um cliente existente.
     * @param cliente - A entidade Cliente a ser atualizada.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Um booleano indicando se a operação foi bem-sucedida.
     */
    AtualizarClienteAsync(cliente: Cliente, cancellationToken?: AbortSignal): Promise<boolean>;

    /**
     * Deleta um cliente do sistema.
     * @param id - O ID do cliente a ser deletado.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Um booleano indicando se a operação foi bem-sucedida.
     */
    DeletarClienteAsync(id: string, cancellationToken?: AbortSignal): Promise<boolean>;

    /**
     * Obtém todos os clientes ativos.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Uma lista de clientes ativos.
     */
    ObterTodosClientesAsync(cancellationToken?: AbortSignal): Promise<Cliente[]>;

    /**
     * Identifica um cliente pelo CPF.
     * @param cpf - O CPF do cliente.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns O cliente identificado ou null, caso não exista.
     */
    IdentificarClienteCpfAsync(cpf: string, cancellationToken?: AbortSignal): Promise<Cliente | null>;
}

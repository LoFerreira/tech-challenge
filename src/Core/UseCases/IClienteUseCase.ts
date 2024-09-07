// src/Application/Interfaces/IClienteUseCase.ts

import { Cliente } from '../Domain/Entities/Cliente';

export interface IClienteUseCase {
    /**
     * Retorna todos os clientes.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa contendo um array de clientes.
     */
    obterTodosClientesAsync(cancellationToken: AbortSignal): Promise<Cliente[]>;

    /**
     * Identifica um cliente pelo CPF.
     * @param cpf - O CPF do cliente.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa contendo o cliente ou null se não for encontrado.
     */
    identificarClienteCpfAsync(cpf: string, cancellationToken: AbortSignal): Promise<Cliente | null>;

    /**
     * Cadastra um novo cliente.
     * @param cliente - O cliente a ser cadastrado.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa contendo um booleano indicando sucesso ou falha.
     */
    cadastrarClienteAsync(cliente: Cliente, cancellationToken: AbortSignal): Promise<boolean>;

    /**
     * Atualiza um cliente existente.
     * @param cliente - O cliente a ser atualizado.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa contendo um booleano indicando sucesso ou falha.
     */
    atualizarClienteAsync(cliente: Cliente, cancellationToken: AbortSignal): Promise<boolean>;

    /**
     * Deleta um cliente pelo ID.
     * @param id - O ID do cliente a ser deletado.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa contendo um booleano indicando sucesso ou falha.
     */
    deletarClienteAsync(id: string, cancellationToken: AbortSignal): Promise<boolean>;
}

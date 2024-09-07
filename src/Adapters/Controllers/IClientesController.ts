// src/Controllers/IClientesController.ts

import { Cliente } from '../../Core/Domain/Entities/Cliente';
import { ClienteRequestDto } from '../Gateways/Dtos/Request/ClienteRequestDto';

export interface IClientesController {
    /**
     * Obtém todos os clientes.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em uma lista de clientes.
     */
    obterTodosClientesAsync(cancellationToken: AbortSignal): Promise<Cliente[]>;

    /**
     * Identifica um cliente pelo CPF.
     * @param cpf - O CPF do cliente a ser identificado.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em um cliente ou null se não for encontrado.
     */
    identificarClienteCpfAsync(cpf: string, cancellationToken: AbortSignal): Promise<Cliente | null>;

    /**
     * Cadastra um novo cliente.
     * @param clienteRequestDto - Os dados do cliente a serem cadastrados.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em um booleano indicando sucesso ou falha.
     */
    cadastrarClienteAsync(clienteRequestDto: ClienteRequestDto, cancellationToken: AbortSignal): Promise<boolean>;

    /**
     * Atualiza um cliente existente.
     * @param clienteRequestDto - Os dados do cliente a serem atualizados.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em um booleano indicando sucesso ou falha.
     */
    atualizarClienteAsync(clienteRequestDto: ClienteRequestDto, cancellationToken: AbortSignal): Promise<boolean>;

    /**
     * Deleta um cliente pelo ID.
     * @param id - O ID do cliente a ser deletado.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em um booleano indicando sucesso ou falha.
     */
    deletarClienteAsync(id: string, cancellationToken: AbortSignal): Promise<boolean>;
}

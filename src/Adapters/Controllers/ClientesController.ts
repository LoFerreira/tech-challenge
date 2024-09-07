// src/Controllers/ClientesController.ts

import { injectable, inject } from 'tsyringe';
import { IClienteUseCase } from '../../Core/UseCases/IClienteUseCase';
import { Cliente } from '../../Core/Domain/Entities/Cliente';
import { ClienteRequestDto } from '../Gateways/Dtos/Request/ClienteRequestDto';

@injectable()
export class ClientesController {
    constructor(
        @inject('IClienteUseCase') private clienteUseCase: IClienteUseCase
    ) {}

    /**
     * Cadastra um novo cliente com base nos dados do DTO.
     * @param clienteRequestDto - Os dados do cliente a serem cadastrados.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em um booleano indicando sucesso ou falha.
     */
    public async cadastrarClienteAsync(clienteRequestDto: ClienteRequestDto, cancellationToken: AbortSignal): Promise<boolean> {
        const cliente = new Cliente(
            clienteRequestDto.id,
            clienteRequestDto.nome,
            clienteRequestDto.email,
            clienteRequestDto.cpf,
            clienteRequestDto.ativo
        );

        return await this.clienteUseCase.cadastrarClienteAsync(cliente, cancellationToken);
    }

    /**
     * Atualiza um cliente existente com base nos dados do DTO.
     * @param clienteRequestDto - Os dados do cliente a serem atualizados.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em um booleano indicando sucesso ou falha.
     */
    public async atualizarClienteAsync(clienteRequestDto: ClienteRequestDto, cancellationToken: AbortSignal): Promise<boolean> {
        const cliente = new Cliente(
            clienteRequestDto.id,
            clienteRequestDto.nome,
            clienteRequestDto.email,
            clienteRequestDto.cpf,
            clienteRequestDto.ativo
        );

        return await this.clienteUseCase.atualizarClienteAsync(cliente, cancellationToken);
    }

    /**
     * Deleta um cliente pelo ID.
     * @param id - O ID do cliente a ser deletado.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em um booleano indicando sucesso ou falha.
     */
    public async deletarClienteAsync(id: string, cancellationToken: AbortSignal): Promise<boolean> {
        return await this.clienteUseCase.deletarClienteAsync(id, cancellationToken);
    }

    /**
     * Obtém todos os clientes.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em uma lista de clientes.
     */
    public async obterTodosClientesAsync(cancellationToken: AbortSignal): Promise<Cliente[]> {
        return await this.clienteUseCase.obterTodosClientesAsync(cancellationToken);
    }

    /**
     * Identifica um cliente pelo CPF.
     * @param cpf - O CPF do cliente a ser identificado.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em um cliente ou null se não for encontrado.
     */
    public async identificarClienteCpfAsync(cpf: string, cancellationToken: AbortSignal): Promise<Cliente | null> {
        return await this.clienteUseCase.identificarClienteCpfAsync(cpf, cancellationToken);
    }
}

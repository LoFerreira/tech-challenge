// src/Adapters/Gateways/ClienteGateway.ts

import { injectable } from 'tsyringe';
import { Cliente } from '../Domain/Entities/Cliente';
import { ClienteDb } from '../External/Infra/Dto/ClienteDb';
import { IClienteRepository } from '../External/Infra/Repositories/IClienteRepository';
import { IClienteGateway } from './IClienteGateway';

@injectable()
export class ClienteGateway implements IClienteGateway {
    constructor(private clienteRepository: IClienteRepository) {}

    /**
     * Cadastra um novo cliente no sistema.
     * @param cliente - A entidade Cliente a ser cadastrada.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Um booleano indicando se a operação foi bem-sucedida.
     */
    async CadastrarClienteAsync(cliente: Cliente, cancellationToken?: AbortSignal): Promise<boolean> {
        const clienteDto = new ClienteDb();
        clienteDto.id = cliente.id;
        clienteDto.nome = cliente.nome;
        clienteDto.email = cliente.email;
        clienteDto.cpf = cliente.cpf;
        clienteDto.ativo = cliente.ativo;

        // Insere o cliente no repositório e comita a transação
        await this.clienteRepository.insert(clienteDto, cancellationToken);
        return await this.clienteRepository.unitOfWork.commit(cancellationToken);
    }

    /**
     * Atualiza as informações de um cliente existente.
     * @param cliente - A entidade Cliente a ser atualizada.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Um booleano indicando se a operação foi bem-sucedida.
     */
    async AtualizarClienteAsync(cliente: Cliente, cancellationToken?: AbortSignal): Promise<boolean> {
        const clienteDto = new ClienteDb();
        clienteDto.id = cliente.id;
        clienteDto.nome = cliente.nome;
        clienteDto.email = cliente.email;
        clienteDto.cpf = cliente.cpf;
        clienteDto.ativo = cliente.ativo;

        // Atualiza o cliente no repositório e comita a transação
        await this.clienteRepository.update(clienteDto, cancellationToken);
        return await this.clienteRepository.unitOfWork.commit(cancellationToken);
    }

    /**
     * Deleta um cliente do sistema.
     * @param id - O ID do cliente a ser deletado.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Um booleano indicando se a operação foi bem-sucedida.
     */
    async DeletarClienteAsync(id: string, cancellationToken?: AbortSignal): Promise<boolean> {
        // Deleta o cliente pelo ID e comita a transação
        await this.clienteRepository.delete(id, cancellationToken);
        return await this.clienteRepository.unitOfWork.commit(cancellationToken);
    }

    /**
     * Verifica se um cliente existe com base no ID, CPF ou e-mail.
     * @param id - O ID do cliente.
     * @param cpf - O CPF do cliente.
     * @param email - O e-mail do cliente.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Um booleano indicando se o cliente existe.
     */
    VerificarClienteExistente(id: string, cpf?: string, email?: string, cancellationToken?: AbortSignal): boolean {
        const clienteExistente = this.clienteRepository.find(
            e => e.id === id || e.cpf === cpf || e.email === email,
            cancellationToken
        ).find(g => g.id === id);

        return clienteExistente !== undefined;
    }

    /**
     * Verifica se um cliente existe com base no ID.
     * @param id - O ID do cliente.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Um booleano indicando se o cliente existe.
     */
    async VerificarClienteExistenteAsync(id: string, cancellationToken?: AbortSignal): Promise<boolean> {
        const clienteExistente = await this.clienteRepository.findById(id, cancellationToken);
        return clienteExistente !== undefined;
    }

    /**
     * Obtém todos os clientes ativos.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Uma lista de clientes ativos.
     */
    async ObterTodosClientesAsync(cancellationToken?: AbortSignal): Promise<Cliente[]> {
        const clienteDtos = await this.clienteRepository.ObterTodosClientesAsync(cancellationToken);

        return clienteDtos.map(dto => new Cliente(dto.id, dto.nome, dto.email, dto.cpf, dto.ativo));
    }

    /**
     * Identifica um cliente pelo CPF.
     * @param cpf - O CPF do cliente.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns O cliente identificado ou null, caso não exista.
     */
    async IdentificarClienteCpfAsync(cpf: string, cancellationToken?: AbortSignal): Promise<Cliente | null> {
        const clienteDto = await this.clienteRepository.IdentificarClienteCpfAsync(cpf, cancellationToken);

        return clienteDto ? new Cliente(clienteDto.id, clienteDto.nome, clienteDto.email, clienteDto.cpf, clienteDto.ativo) : null;
    }
}

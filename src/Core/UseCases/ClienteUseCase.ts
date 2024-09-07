// src/Application/UseCases/ClienteUseCase.ts

import { injectable, inject } from 'tsyringe';
import { IClienteGateway } from '../Gateways/IClienteGateway';
import { INotificador } from '../Core/Domain/Notificacoes/INotificador';
import { Cliente } from '../Domain/Entities/Cliente';
import { IClienteUseCase } from './IClienteUseCase';
import { ValidarCliente } from '../Validations/ValidarCliente';
import { BaseUseCase } from './BaseUseCase';

@injectable()
export class ClienteUseCase extends BaseUseCase implements IClienteUseCase {
    
    constructor(
        @inject('IClienteGateway') private clientesGateway: IClienteGateway,
        @inject('INotificador') notificador: INotificador
    ) {
        super(notificador);
    }

    public async cadastrarClienteAsync(cliente: Cliente, cancellationToken: AbortSignal): Promise<boolean> {
        if (!cliente) {
            throw new Error('Cliente não pode ser nulo.');
        }

        const clienteExistente = await this.clientesGateway.verificarClienteExistente(cliente.id, cliente.cpf, cliente.email, cancellationToken);
        if (clienteExistente) {
            this.notificar('Cliente já existente');
            return false;
        }

        const validacao = this.executarValidacao(new ValidarCliente(), cliente);
        if (!validacao) {
            return false;
        }

        return await this.clientesGateway.cadastrarClienteAsync(cliente, cancellationToken);
    }

    public async atualizarClienteAsync(cliente: Cliente, cancellationToken: AbortSignal): Promise<boolean> {
        if (!cliente) {
            throw new Error('Cliente não pode ser nulo.');
        }

        const clienteExistente = await this.clientesGateway.verificarClienteExistenteAsync(cliente.id, cancellationToken);
        if (!clienteExistente) {
            this.notificar('Cliente inexistente');
            return false;
        }

        const validacao = this.executarValidacao(new ValidarCliente(), cliente);
        if (!validacao) {
            return false;
        }

        return await this.clientesGateway.atualizarClienteAsync(cliente, cancellationToken);
    }

    public async deletarClienteAsync(id: string, cancellationToken: AbortSignal): Promise<boolean> {
        const clienteExistente = await this.clientesGateway.verificarClienteExistenteAsync(id, cancellationToken);
        if (!clienteExistente) {
            this.notificar('Cliente inexistente');
            return false;
        }

        return await this.clientesGateway.deletarClienteAsync(id, cancellationToken);
    }

    public async obterTodosClientesAsync(cancellationToken: AbortSignal): Promise<Cliente[]> {
        return await this.clientesGateway.obterTodosClientesAsync(cancellationToken);
    }

    public async identificarClienteCpfAsync(cpf: string, cancellationToken: AbortSignal): Promise<Cliente | null> {
        const cliente = await this.clientesGateway.identificarClienteCpfAsync(cpf, cancellationToken);
        if (!cliente) {
            this.notificar(`Cliente ${cpf} não encontrado.`);
            return null;
        }

        return cliente;
    }
}

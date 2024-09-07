// src/Controllers/PedidoController.ts

import { injectable, inject } from 'tsyringe';
import { IPedidoUseCase } from '../../Core/UseCases/IPedidoUseCase';
import { IPedidoController } from './IPedidoController';
import { PedidoRequestDto } from '../Gateways/Dtos/Request/PedidoRequestDto';
import { PedidoStatusRequestDto } from '../Gateways/Dtos/Request/PedidoStatusRequestDto';
import { Pedido } from '../Domain/Entities/Pedido';
import { PedidoListaItens } from '../Domain/ValueObjects/PedidoListaItens';
import { PedidoStatus } from '../Domain/ValueObjects/PedidoStatus';

@injectable()
export class PedidoController implements IPedidoController {
    constructor(
        @inject('IPedidoUseCase') private pedidoUseCase: IPedidoUseCase
    ) {}

    /**
     * Altera o status de um pedido.
     * @param pedidoId - O ID do pedido.
     * @param pedidoStatusDto - Os dados do novo status do pedido.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em um booleano indicando sucesso ou falha.
     */
    public async alterarStatusAsync(pedidoId: string, pedidoStatusDto: PedidoStatusRequestDto, cancellationToken: AbortSignal): Promise<boolean> {
        // Tenta converter a string do status para o enum PedidoStatus
        const pedidoStatusValido = Object.values(PedidoStatus).includes(pedidoStatusDto.status as PedidoStatus);

        if (!pedidoStatusValido) {
            return false;
        }

        const status = pedidoStatusDto.status as PedidoStatus;

        return await this.pedidoUseCase.alterarStatusAsync(pedidoId, status, cancellationToken);
    }

    /**
     * Cadastra um novo pedido com base nos dados do DTO.
     * @param pedidoDto - Os dados do pedido a ser cadastrado.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em um booleano indicando sucesso ou falha.
     */
    public async cadastrarPedidoAsync(pedidoDto: PedidoRequestDto, cancellationToken: AbortSignal): Promise<boolean> {
        const pedido = new Pedido(pedidoDto.pedidoId, pedidoDto.clienteId);

        const pedidoListaItens = pedidoDto.items.map(item => new PedidoListaItens(item.produtoId, item.quantidade));

        return await this.pedidoUseCase.cadastrarPedidoAsync(pedido, pedidoListaItens, cancellationToken);
    }

    /**
     * Obtém todos os pedidos.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em uma string com os detalhes dos pedidos.
     */
    public async obterTodosPedidosAsync(cancellationToken: AbortSignal): Promise<string> {
        return await this.pedidoUseCase.obterTodosPedidosAsync(cancellationToken);
    }

    /**
     * Obtém todos os pedidos ordenados.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em uma string com os detalhes dos pedidos ordenados.
     */
    public async obterTodosPedidosOrdenadosAsync(cancellationToken: AbortSignal): Promise<string> {
        return await this.pedidoUseCase.obterTodosPedidosOrdenadosAsync(cancellationToken);
    }
}

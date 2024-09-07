// src/Adapters/Gateways/PedidoGateway.ts

import { injectable } from 'tsyringe';
import { Pedido } from '../../Core/Domain/Entities/Pedido';
import { PedidoStatus } from '../../Core/Domain/ValueObjects/PedidoStatus';
import { PedidoDb } from '../../External/Infra/Dto/PedidoDb';
import { PedidoItemDb } from '../../External/Infra/Dto/PedidoItemDb';
import { IPedidoRepository } from '../../External/Infra/Repositories/IPedidoRepository';
import { IPedidoGateway } from './IPedidoGateway';

@injectable()
export class PedidoGateway implements IPedidoGateway {
    constructor(private pedidoRepository: IPedidoRepository) {}

    /**
     * Cadastra um novo pedido no sistema.
     * @param pedido - A entidade Pedido a ser cadastrada.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Um booleano indicando se a operação foi bem-sucedida.
     */
    async CadastrarPedidoAsync(pedido: Pedido, cancellationToken?: AbortSignal): Promise<boolean> {
        const pedidoDto = new PedidoDb();
        pedidoDto.id = pedido.id;
        pedidoDto.numeroPedido = pedido.numeroPedido;
        pedidoDto.clienteId = pedido.clienteId;
        pedidoDto.status = pedido.status.toString();
        pedidoDto.valorTotal = pedido.valorTotal;
        pedidoDto.dataPedido = pedido.dataPedido;

        // Adiciona os itens do pedido
        pedidoDto.itens = pedido.pedidoItems.map(item => {
            const pedidoItemDb = new PedidoItemDb();
            pedidoItemDb.pedidoId = pedidoDto.id;
            pedidoItemDb.produtoId = item.produtoId;
            pedidoItemDb.quantidade = item.quantidade;
            pedidoItemDb.valorUnitario = item.valorUnitario;
            return pedidoItemDb;
        });

        // Insere o pedido no repositório e comita a transação
        await this.pedidoRepository.insert(pedidoDto, cancellationToken);
        return await this.pedidoRepository.unitOfWork.commit(cancellationToken);
    }

    /**
     * Obtém um pedido pelo ID.
     * @param id - O ID do pedido.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns O pedido correspondente ou null, caso não exista.
     */
    async ObterPedidoAsync(id: string, cancellationToken?: AbortSignal): Promise<Pedido | null> {
        const pedidoDto = await this.pedidoRepository.findById(id, cancellationToken);

        if (!pedidoDto) {
            return null;
        }

        const status = PedidoStatus[pedidoDto.status as keyof typeof PedidoStatus] || PedidoStatus.Recebido;

        return new Pedido(
            pedidoDto.id,
            pedidoDto.numeroPedido,
            pedidoDto.clienteId,
            status,
            pedidoDto.valorTotal,
            pedidoDto.dataPedido
        );
    }

    /**
     * Verifica se um pedido com o ID fornecido já existe no sistema.
     * @param id - O ID do pedido.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Um booleano indicando se o pedido existe.
     */
    async VerificarPedidoExistenteAsync(id: string, cancellationToken?: AbortSignal): Promise<boolean> {
        const pedidoExistente = await this.pedidoRepository.findById(id, cancellationToken);
        return pedidoExistente !== undefined;
    }

    /**
     * Atualiza as informações de um pedido existente.
     * @param pedido - A entidade Pedido a ser atualizada.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Um booleano indicando se a operação foi bem-sucedida.
     */
    async AtualizarPedidoAsync(pedido: Pedido, cancellationToken?: AbortSignal): Promise<boolean> {
        const pedidoDto = new PedidoDb();
        pedidoDto.id = pedido.id;
        pedidoDto.numeroPedido = pedido.numeroPedido;
        pedidoDto.clienteId = pedido.clienteId;
        pedidoDto.status = pedido.status.toString();
        pedidoDto.valorTotal = pedido.valorTotal;
        pedidoDto.dataPedido = pedido.dataPedido;

        // Atualiza o pedido no repositório e comita a transação
        await this.pedidoRepository.update(pedidoDto, cancellationToken);
        return await this.pedidoRepository.unitOfWork.commit(cancellationToken);
    }

    /**
     * Obtém todos os pedidos ordenados por status e data.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Uma string (ex.: JSON) contendo os pedidos ordenados.
     */
    async ObterTodosPedidosOrdenadosAsync(cancellationToken?: AbortSignal): Promise<string> {
        return await this.pedidoRepository.ObterTodosPedidosOrdenadosAsync(cancellationToken);
    }

    /**
     * Obtém todos os pedidos no sistema.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Uma string (ex.: JSON) contendo todos os pedidos.
     */
    async ObterTodosPedidosAsync(cancellationToken?: AbortSignal): Promise<string> {
        return await this.pedidoRepository.ObterTodosPedidosAsync(cancellationToken);
    }
}

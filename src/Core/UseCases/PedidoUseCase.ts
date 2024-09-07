// src/Application/UseCases/PedidoUseCase.ts

import { injectable, inject } from 'tsyringe';
import { IPedidoGateway } from '../Gateways/IPedidoGateway';
import { IProdutoGateway } from '../Gateways/IProdutoGateway';
import { INotificador } from '../Core/Domain/Notificacoes/INotificador';
import { BaseUseCase } from '../Core/Domain/Base/BaseUseCase';
import { IPedidoUseCase } from '../Interfaces/IPedidoUseCase';
import { Pedido } from '../Domain/Entities/Pedido';
import { PedidoListaItens } from '../Domain/ValueObjects/PedidoListaItens';
import { PedidoStatus } from '../Domain/ValueObjects/PedidoStatus';

@injectable()
export class PedidoUseCase extends BaseUseCase implements IPedidoUseCase {

    // Construtor que injeta as dependências necessárias
    constructor(
        @inject('IPedidoGateway') private pedidoGateway: IPedidoGateway,
        @inject('IProdutoGateway') private produtoGateway: IProdutoGateway,
        @inject('INotificador') notificador: INotificador
    ) {
        super(notificador); // Chama o construtor da classe base (BaseUseCase)
    }

    /**
     * Cadastra um novo pedido.
     * @param pedido - A entidade Pedido.
     * @param itens - A lista de itens do pedido.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em um booleano indicando sucesso ou falha.
     */
    public async cadastrarPedidoAsync(
        pedido: Pedido,
        itens: PedidoListaItens[],
        cancellationToken: AbortSignal
    ): Promise<boolean> {
        if (!pedido) {
            throw new Error('Pedido não pode ser nulo.');
        }

        // Verifica se o pedido já existe
        if (await this.pedidoGateway.verificarPedidoExistenteAsync(pedido.id, cancellationToken)) {
            this.notificar('Pedido já existente');
            return false;
        }

        // Executa a validação do pedido
        if (!this.executarValidacao(new ValidarPedido(), pedido)) {
            return false;
        }

        // Processa os itens do pedido
        for (const item of itens) {
            const produto = await this.produtoGateway.obterProdutoAsync(item.produtoId, cancellationToken);

            if (!produto) {
                this.notificar(`Produto ${item.produtoId} não encontrado.`);
            } else {
                pedido.adicionarItem(new PedidoItem(item.produtoId, item.quantidade, produto.preco));
            }
        }

        // Verifica se o pedido contém pelo menos um item
        if (pedido.pedidoItems.length === 0) {
            this.notificar('O pedido precisa ter pelo menos um item.');
            return false;
        }

        // Cadastra o pedido
        return await this.pedidoGateway.cadastrarPedidoAsync(pedido, cancellationToken);
    }

    /**
     * Altera o status de um pedido.
     * @param pedidoId - O ID do pedido.
     * @param pedidoStatus - O novo status do pedido.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em um booleano indicando sucesso ou falha.
     */
    public async alterarStatusAsync(
        pedidoId: string,
        pedidoStatus: PedidoStatus,
        cancellationToken: AbortSignal
    ): Promise<boolean> {
        // Obtém o pedido pelo ID
        const pedido = await this.pedidoGateway.obterPedidoAsync(pedidoId, cancellationToken);

        if (!pedido) {
            this.notificar(`Pedido ${pedidoId} não encontrado.`);
            return false;
        }

        // Tenta alterar o status do pedido
        if (!pedido.alterarStatus(pedidoStatus)) {
            this.notificar('Não foi possível alterar o status do pedido.');
            return false;
        }

        // Atualiza o pedido com o novo status
        return await this.pedidoGateway.atualizarPedidoAsync(pedido, cancellationToken);
    }

    /**
     * Obtém todos os pedidos.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em uma string contendo os pedidos.
     */
    public async obterTodosPedidosAsync(cancellationToken: AbortSignal): Promise<string> {
        return await this.pedidoGateway.obterTodosPedidosAsync(cancellationToken);
    }

    /**
     * Obtém todos os pedidos ordenados.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em uma string contendo os pedidos ordenados.
     */
    public async obterTodosPedidosOrdenadosAsync(cancellationToken: AbortSignal): Promise<string> {
        return await this.pedidoGateway.obterTodosPedidosOrdenadosAsync(cancellationToken);
    }
}

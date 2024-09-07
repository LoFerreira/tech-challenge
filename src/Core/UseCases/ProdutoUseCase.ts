// src/Application/UseCases/ProdutoUseCase.ts

import { injectable, inject } from 'tsyringe';
import { IProdutoGateway } from '../Gateways/IProdutoGateway';
import { INotificador } from '../Core/Domain/Notificacoes/INotificador';
import { BaseUseCase } from '../Core/Domain/Base/BaseUseCase';
import { IProdutoUseCase } from '../Interfaces/IProdutoUseCase';
import { Produto } from '../Domain/Entities/Produto';
import { Categoria } from '../Domain/ValueObjects/Categoria';

@injectable()
export class ProdutoUseCase extends BaseUseCase implements IProdutoUseCase {

    // Construtor que injeta as dependências necessárias
    constructor(
        @inject('IProdutoGateway') private produtoGateway: IProdutoGateway,
        @inject('INotificador') notificador: INotificador
    ) {
        super(notificador); // Chama o construtor da classe base (BaseUseCase)
    }

    /**
     * Cadastra um novo produto.
     * @param produto - A entidade Produto.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em um booleano indicando sucesso ou falha.
     */
    public async cadastrarProdutoAsync(produto: Produto, cancellationToken: AbortSignal): Promise<boolean> {
        if (!produto) {
            throw new Error('Produto não pode ser nulo.');
        }

        // Verifica se o produto já existe
        if (await this.produtoGateway.verificarProdutoExistente(produto.id, produto.nome, produto.descricao, cancellationToken)) {
            this.notificar('Produto já existente');
            return false;
        }

        // Executa a validação do produto
        if (!this.executarValidacao(new ValidarProduto(), produto)) {
            return false;
        }

        // Cadastra o produto
        return await this.produtoGateway.cadastrarProdutoAsync(produto, cancellationToken);
    }

    /**
     * Atualiza um produto existente.
     * @param produto - A entidade Produto.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em um booleano indicando sucesso ou falha.
     */
    public async atualizarProdutoAsync(produto: Produto, cancellationToken: AbortSignal): Promise<boolean> {
        if (!produto) {
            throw new Error('Produto não pode ser nulo.');
        }

        // Verifica se o produto existe
        if (!await this.produtoGateway.verificarProdutoExistenteAsync(produto.id, cancellationToken)) {
            this.notificar('Produto inexistente');
            return false;
        }

        // Executa a validação do produto
        if (!this.executarValidacao(new ValidarProduto(), produto)) {
            return false;
        }

        // Atualiza o produto
        return await this.produtoGateway.atualizarProdutoAsync(produto, cancellationToken);
    }

    /**
     * Deleta um produto pelo ID.
     * @param id - O ID do produto.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em um booleano indicando sucesso ou falha.
     */
    public async deletarProdutoAsync(id: string, cancellationToken: AbortSignal): Promise<boolean> {
        // Verifica se o produto existe
        if (!await this.produtoGateway.verificarProdutoExistenteAsync(id, cancellationToken)) {
            this.notificar('Produto inexistente');
            return false;
        }

        // Deleta o produto
        return await this.produtoGateway.deletarProdutoAsync(id, cancellationToken);
    }

    /**
     * Obtém todos os produtos.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em uma lista de produtos.
     */
    public async obterTodosProdutosAsync(cancellationToken: AbortSignal): Promise<Produto[]> {
        return await this.produtoGateway.obterTodosProdutosAsync(cancellationToken);
    }

    /**
     * Obtém produtos por categoria.
     * @param categoria - A categoria dos produtos.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em uma lista de produtos da categoria especificada.
     */
    public async obterProdutosCategoriaAsync(categoria: Categoria, cancellationToken: AbortSignal): Promise<Produto[]> {
        return await this.produtoGateway.obterProdutosCategoriaAsync(categoria, cancellationToken);
    }
}

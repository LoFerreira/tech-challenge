// src/Application/Interfaces/IProdutoUseCase.ts

import { Produto } from '../../xxxdomain/Entities/Produto';
import { Categoria } from '../../xxxdomain/ValueObjects/Categoria';

export interface IProdutoUseCase {
    /**
     * Obtém todos os produtos.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa contendo uma lista de produtos.
     */
    obterTodosProdutosAsync(cancellationToken: AbortSignal): Promise<Produto[]>;

    /**
     * Obtém produtos por categoria.
     * @param categoria - A categoria dos produtos a serem obtidos.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa contendo uma lista de produtos da categoria especificada.
     */
    obterProdutosCategoriaAsync(categoria: Categoria, cancellationToken: AbortSignal): Promise<Produto[]>;

    /**
     * Cadastra um novo produto.
     * @param produto - O produto a ser cadastrado.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa contendo um booleano indicando sucesso ou falha.
     */
    cadastrarProdutoAsync(produto: Produto, cancellationToken: AbortSignal): Promise<boolean>;

    /**
     * Atualiza um produto existente.
     * @param produto - O produto a ser atualizado.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa contendo um booleano indicando sucesso ou falha.
     */
    atualizarProdutoAsync(produto: Produto, cancellationToken: AbortSignal): Promise<boolean>;

    /**
     * Deleta um produto pelo ID.
     * @param id - O ID do produto a ser deletado.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa contendo um booleano indicando sucesso ou falha.
     */
    deletarProdutoAsync(id: string, cancellationToken: AbortSignal): Promise<boolean>;
}

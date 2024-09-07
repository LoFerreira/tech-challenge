// src/Controllers/IProdutosController.ts

import { Produto } from '../Domain/Entities/Produto';
import { ProdutoRequestDto } from '../Gateways/Dtos/Request/ProdutoRequestDto';

export interface IProdutosController {
    /**
     * Obtém todos os produtos.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em uma lista de produtos.
     */
    obterTodosProdutosAsync(cancellationToken: AbortSignal): Promise<Produto[]>;

    /**
     * Obtém produtos por categoria.
     * @param categoria - O nome da categoria dos produtos.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em uma lista de produtos filtrados pela categoria.
     */
    obterProdutosCategoriaAsync(categoria: string, cancellationToken: AbortSignal): Promise<Produto[]>;

    /**
     * Cadastra um novo produto com base nos dados do DTO.
     * @param produtoDto - Os dados do produto a ser cadastrado.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em um booleano indicando sucesso ou falha.
     */
    cadastrarProdutoAsync(produtoDto: ProdutoRequestDto, cancellationToken: AbortSignal): Promise<boolean>;

    /**
     * Atualiza um produto existente com base nos dados do DTO.
     * @param produtoDto - Os dados do produto a ser atualizado.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em um booleano indicando sucesso ou falha.
     */
    atualizarProdutoAsync(produtoDto: ProdutoRequestDto, cancellationToken: AbortSignal): Promise<boolean>;

    /**
     * Deleta um produto pelo ID.
     * @param id - O ID do produto a ser deletado.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em um booleano indicando sucesso ou falha.
     */
    deletarProdutoAsync(id: string, cancellationToken: AbortSignal): Promise<boolean>;
}

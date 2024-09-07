// src/Adapters/Gateways/IProdutoGateway.ts

import { Produto } from '../../Core/Domain/Entities/Produto';
import { Categoria } from '../../Core/Domain/ValueObjects/Categoria';

/**
 * Interface que define as operações para o gateway de produtos.
 */
export interface IProdutoGateway {
    /**
     * Verifica se um produto com o ID, nome ou descrição fornecidos já existe no sistema.
     * @param id - O ID do produto.
     * @param nome - O nome do produto.
     * @param descricao - A descrição do produto.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Um booleano indicando se o produto existe.
     */
    VerificarProdutoExistente(id: string, nome: string, descricao: string, cancellationToken?: AbortSignal): boolean;

    /**
     * Verifica se um produto com o ID fornecido já existe no sistema de forma assíncrona.
     * @param id - O ID do produto.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Um booleano indicando se o produto existe.
     */
    VerificarProdutoExistenteAsync(id: string, cancellationToken?: AbortSignal): Promise<boolean>;

    /**
     * Obtém um produto pelo ID.
     * @param id - O ID do produto.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns O produto correspondente ou null, caso não exista.
     */
    ObterProdutoAsync(id: string, cancellationToken?: AbortSignal): Promise<Produto | null>;

    /**
     * Cadastra um novo produto no sistema.
     * @param produto - A entidade Produto a ser cadastrada.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Um booleano indicando se a operação foi bem-sucedida.
     */
    CadastrarProdutoAsync(produto: Produto, cancellationToken?: AbortSignal): Promise<boolean>;

    /**
     * Atualiza as informações de um produto existente.
     * @param produto - A entidade Produto a ser atualizada.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Um booleano indicando se a operação foi bem-sucedida.
     */
    AtualizarProdutoAsync(produto: Produto, cancellationToken?: AbortSignal): Promise<boolean>;

    /**
     * Deleta um produto do sistema.
     * @param id - O ID do produto a ser deletado.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Um booleano indicando se a operação foi bem-sucedida.
     */
    DeletarProdutoAsync(id: string, cancellationToken?: AbortSignal): Promise<boolean>;

    /**
     * Obtém todos os produtos ativos no sistema.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Uma lista de produtos ativos.
     */
    ObterTodosProdutosAsync(cancellationToken?: AbortSignal): Promise<Produto[]>;

    /**
     * Obtém todos os produtos ativos de uma categoria específica.
     * @param categoria - A categoria do produto.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Uma lista de produtos filtrados pela categoria.
     */
    ObterProdutosCategoriaAsync(categoria: Categoria, cancellationToken?: AbortSignal): Promise<Produto[]>;
}

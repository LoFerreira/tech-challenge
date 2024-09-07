// src/External/Infra/Repositories/IProdutoRepository.ts

import { Repository } from 'typeorm';
import { ProdutoDb } from '../Dto/ProdutoDb';

/**
 * Interface do repositório de produtos que estende a funcionalidade genérica do repositório do TypeORM.
 */
export interface IProdutoRepository extends Repository<ProdutoDb> {
    /**
     * Obtém todos os produtos.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Uma lista de todos os produtos.
     */
    ObterTodosProdutosAsync(cancellationToken?: AbortSignal): Promise<ProdutoDb[]>;

    /**
     * Obtém todos os produtos de uma categoria específica.
     * @param categoria - O nome da categoria.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Uma lista de produtos filtrados por categoria.
     */
    ObterProdutosCategoriaAsync(categoria: string, cancellationToken?: AbortSignal): Promise<ProdutoDb[]>;
}

// src/External/Infra/Repositories/ProdutoRepository.ts

import { Repository } from 'typeorm';
import { ProdutoDb } from '../Dto/ProdutoDb';
import { IProdutoRepository } from './IProdutoRepository';
import { Injectable } from 'injection-js';

@Injectable()
export class ProdutoRepository implements IProdutoRepository {
    private produtoRepository: Repository<ProdutoDb>;

    constructor(produtoRepository: Repository<ProdutoDb>) {
        // Inicializa o repositório do TypeORM para a entidade ProdutoDb
        this.produtoRepository = produtoRepository;
    }

    /**
     * Obtém todos os produtos ativos.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Uma lista de todos os produtos ativos.
     */
    async ObterTodosProdutosAsync(cancellationToken?: AbortSignal): Promise<ProdutoDb[]> {
        return await this.produtoRepository
            .createQueryBuilder('produto')
            .where('produto.ativo = :ativo', { ativo: true })
            .setAbortSignal(cancellationToken) // Cancela a operação se necessário
            .getMany();
    }

    /**
     * Obtém todos os produtos ativos de uma categoria específica.
     * @param categoria - O nome da categoria.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Uma lista de produtos ativos filtrados por categoria.
     */
    async ObterProdutosCategoriaAsync(categoria: string, cancellationToken?: AbortSignal): Promise<ProdutoDb[]> {
        return await this.produtoRepository
            .createQueryBuilder('produto')
            .where('produto.ativo = :ativo AND produto.categoria = :categoria', { ativo: true, categoria })
            .setAbortSignal(cancellationToken) // Cancela a operação se necessário
            .getMany();
    }
}

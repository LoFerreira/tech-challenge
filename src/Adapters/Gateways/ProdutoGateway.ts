// src/Adapters/Gateways/ProdutoGateway.ts

import { injectable } from 'tsyringe';
import { Produto } from '../../Core/Domain/Entities/Produto';
import { Categoria } from '../../Core/Domain/ValueObjects/Categoria';
import { ProdutoDb } from '../../External/Infra/Dto/ProdutoDb';
import { IProdutoRepository } from '../../External/Infra/Repositories/IProdutoRepository';
import { IProdutoGateway } from './IProdutoGateway';

@injectable()
export class ProdutoGateway implements IProdutoGateway {
    constructor(private produtoRepository: IProdutoRepository) {}

    /**
     * Cadastra um novo produto no sistema.
     * @param produto - A entidade Produto a ser cadastrada.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Um booleano indicando se a operação foi bem-sucedida.
     */
    async CadastrarProdutoAsync(produto: Produto, cancellationToken?: AbortSignal): Promise<boolean> {
        const produtoDto = new ProdutoDb();
        produtoDto.id = produto.id;
        produtoDto.nome = produto.nome;
        produtoDto.descricao = produto.descricao;
        produtoDto.preco = produto.preco;
        produtoDto.categoria = produto.categoria.toString();
        produtoDto.ativo = produto.ativo;

        // Insere o produto no repositório e comita a transação
        await this.produtoRepository.insert(produtoDto, cancellationToken);
        return await this.produtoRepository.unitOfWork.commit(cancellationToken);
    }

    /**
     * Atualiza as informações de um produto existente.
     * @param produto - A entidade Produto a ser atualizada.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Um booleano indicando se a operação foi bem-sucedida.
     */
    async AtualizarProdutoAsync(produto: Produto, cancellationToken?: AbortSignal): Promise<boolean> {
        const produtoDto = new ProdutoDb();
        produtoDto.id = produto.id;
        produtoDto.nome = produto.nome;
        produtoDto.descricao = produto.descricao;
        produtoDto.preco = produto.preco;
        produtoDto.categoria = produto.categoria.toString();
        produtoDto.ativo = produto.ativo;

        // Atualiza o produto no repositório e comita a transação
        await this.produtoRepository.update(produtoDto, cancellationToken);
        return await this.produtoRepository.unitOfWork.commit(cancellationToken);
    }

    /**
     * Deleta um produto do sistema.
     * @param id - O ID do produto a ser deletado.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Um booleano indicando se a operação foi bem-sucedida.
     */
    async DeletarProdutoAsync(id: string, cancellationToken?: AbortSignal): Promise<boolean> {
        await this.produtoRepository.delete(id, cancellationToken);
        return await this.produtoRepository.unitOfWork.commit(cancellationToken);
    }

    /**
     * Verifica se um produto com o ID, nome ou descrição fornecidos já existe no sistema.
     * @param id - O ID do produto.
     * @param nome - O nome do produto.
     * @param descricao - A descrição do produto.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Um booleano indicando se o produto existe.
     */
    VerificarProdutoExistente(id: string, nome: string, descricao: string, cancellationToken?: AbortSignal): boolean {
        const produtoExistente = this.produtoRepository
            .find(e => e.id === id || e.nome === nome || e.descricao === descricao, cancellationToken)
            .shift();

        return produtoExistente !== undefined;
    }

    /**
     * Verifica se um produto com o ID fornecido já existe no sistema de forma assíncrona.
     * @param id - O ID do produto.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Um booleano indicando se o produto existe.
     */
    async VerificarProdutoExistenteAsync(id: string, cancellationToken?: AbortSignal): Promise<boolean> {
        const produtoExistente = await this.produtoRepository.findById(id, cancellationToken);
        return produtoExistente !== undefined;
    }

    /**
     * Obtém um produto pelo ID.
     * @param id - O ID do produto.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns O produto correspondente ou null, caso não exista.
     */
    async ObterProdutoAsync(id: string, cancellationToken?: AbortSignal): Promise<Produto | null> {
        const produtoDto = await this.produtoRepository.findById(id, cancellationToken);

        if (!produtoDto) {
            return null;
        }

        const categoria = Categoria[produtoDto.categoria as keyof typeof Categoria] || Categoria.Outros;

        return new Produto(produtoDto.id, produtoDto.nome, produtoDto.descricao, produtoDto.preco, categoria, produtoDto.ativo);
    }

    /**
     * Obtém todos os produtos ativos no sistema.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Uma lista de produtos ativos.
     */
    async ObterTodosProdutosAsync(cancellationToken?: AbortSignal): Promise<Produto[]> {
        const produtoDto = await this.produtoRepository.ObterTodosProdutosAsync(cancellationToken);

        return produtoDto.map(item => {
            const categoria = Categoria[item.categoria as keyof typeof Categoria] || Categoria.Outros;
            return new Produto(item.id, item.nome, item.descricao, item.preco, categoria, item.ativo);
        });
    }

    /**
     * Obtém todos os produtos ativos de uma categoria específica.
     * @param categoria - A categoria do produto.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Uma lista de produtos filtrados pela categoria.
     */
    async ObterProdutosCategoriaAsync(categoria: Categoria, cancellationToken?: AbortSignal): Promise<Produto[]> {
        const produtoDto = await this.produtoRepository.ObterProdutosCategoriaAsync(categoria.toString(), cancellationToken);

        return produtoDto.map(item => {
            const produtoCategoria = Categoria[item.categoria as keyof typeof Categoria] || Categoria.Outros;
            return new Produto(item.id, item.nome, item.descricao, item.preco, produtoCategoria, item.ativo);
        });
    }
}

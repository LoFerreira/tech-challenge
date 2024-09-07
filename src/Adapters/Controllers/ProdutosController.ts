// src/Controllers/ProdutosController.ts

import { injectable, inject } from 'tsyringe';
import { IProdutoUseCase } from '../../Core/UseCases/IProdutoUseCase';
import { IProdutosController } from './IProdutosController';
import { ProdutoRequestDto } from '../Gateways/Dtos/Request/ProdutoRequestDto';
import { Produto } from '../Domain/Entities/Produto';
import { Categoria } from '../Domain/ValueObjects/Categoria';

@injectable()
export class ProdutosController implements IProdutosController {
    constructor(
        @inject('IProdutoUseCase') private produtoUseCase: IProdutoUseCase
    ) {}

    /**
     * Cadastra um novo produto com base nos dados do DTO.
     * @param produtoDto - Os dados do produto a ser cadastrado.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em um booleano indicando sucesso ou falha.
     */
    public async cadastrarProdutoAsync(produtoDto: ProdutoRequestDto, cancellationToken: AbortSignal): Promise<boolean> {
        // Tenta converter a string da categoria para o enum Categoria
        const categoriaValida = Object.values(Categoria).includes(produtoDto.categoria as Categoria);

        if (categoriaValida) {
            const categoria = produtoDto.categoria as Categoria;
            const produto = new Produto(
                produtoDto.id,
                produtoDto.nome,
                produtoDto.descricao,
                produtoDto.preco,
                categoria,
                produtoDto.ativo
            );

            return await this.produtoUseCase.cadastrarProdutoAsync(produto, cancellationToken);
        }

        return false;
    }

    /**
     * Atualiza um produto existente com base nos dados do DTO.
     * @param produtoDto - Os dados do produto a ser atualizado.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em um booleano indicando sucesso ou falha.
     */
    public async atualizarProdutoAsync(produtoDto: ProdutoRequestDto, cancellationToken: AbortSignal): Promise<boolean> {
        // Tenta converter a string da categoria para o enum Categoria
        const categoriaValida = Object.values(Categoria).includes(produtoDto.categoria as Categoria);

        if (categoriaValida) {
            const categoria = produtoDto.categoria as Categoria;
            const produto = new Produto(
                produtoDto.id,
                produtoDto.nome,
                produtoDto.descricao,
                produtoDto.preco,
                categoria,
                produtoDto.ativo
            );

            return await this.produtoUseCase.atualizarProdutoAsync(produto, cancellationToken);
        }

        return false;
    }

    /**
     * Deleta um produto pelo ID.
     * @param id - O ID do produto a ser deletado.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em um booleano indicando sucesso ou falha.
     */
    public async deletarProdutoAsync(id: string, cancellationToken: AbortSignal): Promise<boolean> {
        return await this.produtoUseCase.deletarProdutoAsync(id, cancellationToken);
    }

    /**
     * Obtém todos os produtos.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em uma lista de produtos.
     */
    public async obterTodosProdutosAsync(cancellationToken: AbortSignal): Promise<Produto[]> {
        return await this.produtoUseCase.obterTodosProdutosAsync(cancellationToken);
    }

    /**
     * Obtém produtos por categoria.
     * @param categoriaDto - O nome da categoria dos produtos.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em uma lista de produtos filtrados pela categoria.
     */
    public async obterProdutosCategoriaAsync(categoriaDto: string, cancellationToken: AbortSignal): Promise<Produto[]> {
        // Tenta converter a string da categoria para o enum Categoria
        const categoriaValida = Object.values(Categoria).includes(categoriaDto as Categoria);

        return categoriaValida
            ? await this.produtoUseCase.obterProdutosCategoriaAsync(categoriaDto as Categoria, cancellationToken)
            : [];
    }
}

import { IProductRepository } from '../../adapters/repositories/IProductRepository';

/**
 * Caso de uso para deletar um produto pelo ID.
 */
export class DeleteProductUseCase {
    constructor(private productRepository: IProductRepository) {}

    /**
     * Executa a exclusão de um produto existente pelo ID.
     * @param id ID do produto a ser deletado.
     */
    async execute(id: string): Promise<void> {
        // Chamando o método delete do repositório para remover o produto
        await this.productRepository.delete(id);
    }
}

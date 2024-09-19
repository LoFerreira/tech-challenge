import { IProductRepository } from '../../adapters/repositories/IProductRepository';
import { ProductDTO } from '../../adapters/dtos/ProductDTO';
import { Product } from '../entities/Product';

export class GetProductByIdUseCase {
    constructor(private productRepository: IProductRepository) {}

    /**
     * Busca um produto pelo ID e retorna como DTO.
     */
    async execute(id: string): Promise<ProductDTO | null> {
        const product = await this.productRepository.findById(id);
        if (!product) {
            return null;
        }
        return this.toDTO(product);
    }

    /**
     * Converte uma entidade Product em ProductDTO.
     */
    private toDTO(product: Product): ProductDTO {
        return {
            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
            description: product.description,
            image: product.image,
        };
    }
}

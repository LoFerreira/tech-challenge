import { IProductRepository } from '../../adapters/repositories/IProductRepository';
import { ProductDTO } from '../../adapters/dtos/ProductDTO';
import { Product } from '../entities/Product';

export class ListProductsByCategoryUseCase {
    constructor(private productRepository: IProductRepository) {}

    /**
     * Lista todos os produtos de uma categoria específica como DTO.
     */
    async execute(category: string): Promise<ProductDTO[]> {
        const products = await this.productRepository.findByCategory(category);
        return products.map(product => this.toDTO(product));
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

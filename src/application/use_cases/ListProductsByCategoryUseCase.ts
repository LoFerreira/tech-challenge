import { IProductRepository } from '../../domain/interfaces/IProductRepository';
import { Product } from '../../domain/entities/Product';

export class ListProductsByCategoryUseCase {
    constructor(private productRepository: IProductRepository) { }

    async execute(category: string): Promise<Product[]> {
        return this.productRepository.findByCategory(category);
    }
}
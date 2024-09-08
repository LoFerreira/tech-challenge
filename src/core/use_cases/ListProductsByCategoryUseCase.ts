import { IProductRepository } from '../../adapters/repositories/IProductRepository';
import { Product } from '../entities/Product';

export class ListProductsByCategoryUseCase {
    constructor(private productRepository: IProductRepository) { }

    async execute(category: string): Promise<Product[]> {
        return this.productRepository.findByCategory(category);
    }
}
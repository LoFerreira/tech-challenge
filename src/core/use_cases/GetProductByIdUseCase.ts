import { IProductRepository } from '../../adapters/repositories/IProductRepository';
import { Product } from '../entities/Product';

export class GetProductByIdUseCase {
    constructor(private productRepository: IProductRepository) { }

    async execute(id: string): Promise<Product | null> {
        return this.productRepository.findById(id);
    }
}
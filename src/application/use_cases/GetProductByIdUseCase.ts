import { IProductRepository } from '../../domain/interfaces/IProductRepository';
import { Product } from '../../domain/entities/Product';

export class GetProductByIdUseCase {
    constructor(private productRepository: IProductRepository) { }

    async execute(id: string): Promise<Product | null> {
        return this.productRepository.findById(id);
    }
}
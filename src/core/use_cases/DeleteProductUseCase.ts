import { IProductRepository } from '../../adapters/repositories/IProductRepository';

export class DeleteProductUseCase {
    constructor(private productRepository: IProductRepository) { }

    async execute(id: string): Promise<void> {
        await this.productRepository.delete(id);
    }
}
import { IProductRepository } from '../../domain/interfaces/IProductRepository';

export class DeleteProductUseCase {
    constructor(private productRepository: IProductRepository) { }

    async execute(id: string): Promise<void> {
        await this.productRepository.delete(id);
    }
}
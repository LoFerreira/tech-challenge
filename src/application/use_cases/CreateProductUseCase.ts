import { IProductRepository } from '../../domain/interfaces/IProductRepository';
import { Product } from '../../domain/entities/Product';
import fs from 'fs';

interface CreateProductRequest {
    name: string;
    category: string;
    price: number;
    description: string;
    imagePath: string;
    mimetype: string;
}

export class CreateProductUseCase {
    constructor(private productRepository: IProductRepository) { }

    async execute(request: CreateProductRequest): Promise<Product> {
        const { name, category, price, description, imagePath, mimetype } = request;

        const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });
        const imageDataUri = `data:${mimetype};base64,${imageBase64}`;

        const product = new Product('generated-id', name, category, price, description, imageDataUri);

        const savedProduct = await this.productRepository.create(product);

        fs.unlinkSync(imagePath);

        return savedProduct;
    }
}
import { IProductRepository } from '../../domain/interfaces/IProductRepository';
import { Product } from '../../domain/entities/Product'; // Certifique-se de importar Product
import fs from 'fs';

interface UpdateProductRequest {
    id: string;
    name?: string;
    category?: string;
    price?: number;
    description?: string;
    imagePath?: string;
    mimetype?: string;
}

export class UpdateProductUseCase {
    constructor(private productRepository: IProductRepository) { }

    async execute(request: UpdateProductRequest): Promise<void> {
        const { id, name, category, price, description, imagePath, mimetype } = request;

        const updateData: Partial<Product> = { name, category, price, description };

        if (imagePath) {
            const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });
            const imageDataUri = `data:${mimetype};base64,${imageBase64}`;
            updateData.image = imageDataUri;
            fs.unlinkSync(imagePath);
        }

        await this.productRepository.update(id, updateData);
    }
}
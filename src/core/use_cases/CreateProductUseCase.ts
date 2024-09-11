import { IProductRepository } from '../../adapters/repositories/IProductRepository';
import { Product } from '../entities/Product';
import { ProductDTO } from '../dtos/ProductDTO';  // Importando o DTO
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
    constructor(private productRepository: IProductRepository) {}

    /**
     * Executa a criação de um novo produto.
     * Converte a imagem em Base64 e retorna o produto criado como DTO.
     */
    async execute(request: CreateProductRequest): Promise<ProductDTO> {
        const { name, category, price, description, imagePath, mimetype } = request;

        // Ler o arquivo de imagem e converter para Base64
        const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });
        const imageDataUri = `data:${mimetype};base64,${imageBase64}`;

        // Criar uma nova entidade Product
        const product = new Product('generated-id', name, category, price, description, imageDataUri);

        // Salvar o produto no repositório
        const savedProduct = await this.productRepository.create(product);

        // Remover o arquivo de imagem temporário
        fs.unlinkSync(imagePath);

        // Retornar o DTO do produto criado
        return this.toDTO(savedProduct);
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

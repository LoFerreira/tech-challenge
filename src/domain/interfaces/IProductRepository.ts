import { Product } from '../entities/Product';

export interface IProductRepository {
    create(product: Product): Promise<Product>;
    update(id: string, productData: Partial<Product>): Promise<void>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<Product | null>;
    findByCategory(category: string): Promise<Product[]>;
}
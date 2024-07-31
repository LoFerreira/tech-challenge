import { IProductRepository } from '../../domain/interfaces/IProductRepository';
import { Product } from '../../domain/entities/Product';
import ProductModel from '../../infrastructure/frameworks/mongoose/models/ProductModel';

export class MongoProductRepository implements IProductRepository {
    async create(product: Product): Promise<Product> {
        const productModel = new ProductModel({
            name: product.name,
            category: product.category,
            price: product.price,
            description: product.description,
            image: product.image
        });

        const savedProduct = await productModel.save();
        return new Product(
            savedProduct.id.toString(),
            savedProduct.name,
            savedProduct.category,
            savedProduct.price,
            savedProduct.description,
            savedProduct.image
        );
    }

    async update(id: string, productData: Partial<Product>): Promise<void> {
        await ProductModel.findByIdAndUpdate(id, productData, { new: true });
    }

    async delete(id: string): Promise<void> {
        await ProductModel.findByIdAndDelete(id);
    }

    async findById(id: string): Promise<Product | null> {
        const productData = await ProductModel.findById(id).exec();
        if (!productData) return null;

        return new Product(
            productData.id.toString(),
            productData.name,
            productData.category,
            productData.price,
            productData.description,
            productData.image
        );
    }

    async findByCategory(category: string): Promise<Product[]> {
        const productsData = await ProductModel.find({ category }).exec();
        return productsData.map(productData => new Product(
            productData.id.toString(),
            productData.name,
            productData.category,
            productData.price,
            productData.description,
            productData.image
        ));
    }
}
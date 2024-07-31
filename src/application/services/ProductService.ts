import { CreateProductUseCase } from '../use_cases/CreateProductUseCase';
import { UpdateProductUseCase } from '../use_cases/UpdateProductUseCase';
import { DeleteProductUseCase } from '../use_cases/DeleteProductUseCase';
import { GetProductByIdUseCase } from '../use_cases/GetProductByIdUseCase';
import { ListProductsByCategoryUseCase } from '../use_cases/ListProductsByCategoryUseCase';

class ProductService {
  constructor(
    private createProductUseCase: CreateProductUseCase,
    private updateProductUseCase: UpdateProductUseCase,
    private deleteProductUseCase: DeleteProductUseCase,
    private getProductByIdUseCase: GetProductByIdUseCase,
    private listProductsByCategoryUseCase: ListProductsByCategoryUseCase
  ) { }

  async createProduct(data: {
    name: string;
    category: string;
    price: number;
    description: string;
    imagePath: string;
    mimetype: string;
  }) {
    try {
      return await this.createProductUseCase.execute(data);
    } catch (err: any) {
      throw new Error(`Failed to register product: ${err.message}`);
    }
  }

  async updateProduct(data: {
    id: string;
    name?: string;
    category?: string;
    price?: number;
    description?: string;
    imagePath?: string;
    mimetype?: string;
  }) {
    try {
      return await this.updateProductUseCase.execute(data);
    } catch (err: any) {
      throw new Error(`Failed to update product: ${err.message}`);
    }
  }

  async deleteProduct(id: string) {
    try {
      return await this.deleteProductUseCase.execute(id);
    } catch (err: any) {
      throw new Error(`Failed to delete product: ${err.message}`);
    }
  }

  async getProductByID(id: string) {
    try {
      return await this.getProductByIdUseCase.execute(id);
    } catch (err: any) {
      throw new Error(`Failed to get product: ${err.message}`);
    }
  }

  async listProductsByCategory(category: string) {
    try {
      return await this.listProductsByCategoryUseCase.execute(category);
    } catch (err: any) {
      throw new Error(`Failed to list products: ${err.message}`);
    }
  }
}

export default ProductService;
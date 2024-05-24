import fs from "fs";
import { default as Product } from "../model/ProductModel";

class ProductService {
  /*[CRIAR PRODUTO]*/
  static async createProduct({
    name,
    category,
    price,
    description,
    imagePath,
    mimetype,
  }) {
    try {
      const imageBase64 = fs.readFileSync(imagePath, { encoding: "base64" });
      const imageDataUri = `data:${mimetype};base64,${imageBase64}`;

      const newProduct = new Product({
        name,
        category,
        price,
        description,
        image: imageDataUri,
      });

      const savedProduct = await newProduct.save();

      fs.unlinkSync(imagePath);
      return savedProduct.toJSON();
    } catch (err: any) {
      throw new Error(`Failed to register product: ${err.message}`);
    }
  }

  /*[ATUALIZA PRODUTO]*/
  static async updateProduct({
    id,
    name,
    category,
    price,
    description,
    imagePath,
    mimetype,
  }) {
    try {
      const product = await Product.findById(id);
      if (!product) {
        throw new Error("Product not found");
      }

      if (imagePath) {
        const imageBase64 = fs.readFileSync(imagePath, { encoding: "base64" });
        const imageDataUri = `data:${mimetype};base64,${imageBase64}`;
        product.image = imageDataUri;
        fs.unlinkSync(imagePath);
      }

      product.name = name || product.name;
      product.category = category || product.category;
      product.price = price || product.price;
      product.description = description || product.description;

      await product.save();
      return { message: "Product updated successfully." };
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  /*[DELETA PRODUTO]*/
  static async deleteProduct(id: string) {
    try {
      await Product.findByIdAndDelete(id);
      return { message: "Product deleted successfully." };
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  /*[LISTA POR CATEGORIA PRODUTOS]*/
  static async listProductsByCategory(category: string) {
    try {
      return await Product.find({ category }, {});
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}

/*[DISPONIBILIZA AS PRODUCT-SERVICES]*/
export default ProductService;

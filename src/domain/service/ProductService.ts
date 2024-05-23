import Product from "../model/ProductModel";


class ProductService {


    /*[CRIAR PRODUTO]*/
    static async createProduct(productData: any) {
        try {
            const product = new Product(productData);
            const savedProduct = await product.save();
            return savedProduct.toJSON();
        } catch (err : any) {
            throw new Error(`Failed to register product: ${err.message}`);
        }
    }

    /*[ATUALIZA PRODUTO]*/
    static async updateProduct(id: string, updateData: any) {
        try {
            await Product.findByIdAndUpdate(id, { $set: updateData });
            return { message: "Product updated successfully." };
        } catch (err : any) {
            throw new Error(err.message);
        }
    }

    /*[DELETA PRODUTO]*/
    static async deleteProduct(id: string) {
        try {
            await Product.findByIdAndDelete(id);
            return { message: "Product deleted successfully." };
        } catch (err : any) {
            throw new Error(err.message);
        }
    }


    /*[LISTA POR CATEGORIA PRODUTOS]*/
    static async listProductsByCategory(category: string) {
        try {
            return await Product.find({ category }, {});
        } catch (err : any) {
            throw new Error(err.message);
        }
    }
}

/*[DISPONIBILIZA AS PRODUCT-SERVICES]*/
export default ProductService;

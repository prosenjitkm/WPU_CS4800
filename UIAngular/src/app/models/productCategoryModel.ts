import {Product} from "./productModel";

export interface ProductCategory {
    productCategoryId: number;
    categoryName: string;
    products: Product[];
}

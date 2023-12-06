/*productCategoryModel.ts*/

import {Product} from "./productModel";

export interface ProductCategory {
    id: number;
    categoryName: string;
    products: Product[];
}

/*productModel.ts*/

import {User} from "./userModel";
import {ProductCategory} from "./productCategoryModel";

export interface Product {
    id: number;
    productName: string;
    productQuantity: number;
    productPrice: number;
    productDescription: string;
    productImageUrl: string;
    productSalePrice: number;
    isOnSale: boolean;
    isAvailable: boolean;
    createdDate: Date;
    lastModifiedDate: Date;
    user: User;
    productCategory: ProductCategory;
}

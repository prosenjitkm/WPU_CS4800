/*userModel.ts*/
import { UserCategory } from "./userCategoryModel";
import { Product } from "./productModel";
import { Order } from "./orderModel";
import { CartItem } from "./cartItemModel";

export interface User {
    id: number;
    userName: string;
    userImageUrl: string,
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    email: string;
    phone: string;
    houseNumber: string;
    streetName: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isActive: boolean;
    createdDate: Date;
    lastModifiedDate: Date;
    userCategory: UserCategory;
    products: Product[];
    orders: Order[];
    cart: CartItem[];
}

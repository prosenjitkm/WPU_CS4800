/*userModel.ts*/

import {UserCategory} from "./userCategoryModel";
import {Product} from "./productModel";

export interface User {
    userId: number;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string; // LocalDate can be represented as a string in YYYY-MM-DD format
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
}

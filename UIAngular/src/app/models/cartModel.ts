/*cartModel.ts*/
import { CartItem } from "./cartItemModel";

export interface Cart {
    id: string;
    userId: number;
    cartItems: CartItem[];
}


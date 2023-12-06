// CartModel.ts
import {OrderedItem} from "./orderedItem";

export interface Order {
  id: string;
  userId: number;
  orderedItems: OrderedItem[];
}

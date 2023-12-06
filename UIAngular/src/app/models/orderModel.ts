/*orderModel.ts*/
import {OrderedItem} from "./orderedItem";

export interface Order {
  id: string;
  userId: number;
  orderedDate: Date,
  deliveredDate: Date,
  total: number,
  orderedItems: OrderedItem[];
}

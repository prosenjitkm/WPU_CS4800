/*order.service.ts*/
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Order } from "../../models/orderModel";
import { Injectable } from '@angular/core';
import { CartService} from "../cart/cart.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrlOrders = 'http://localhost:3000/ORDERS';

  constructor(private http: HttpClient) {}

  getOrdersByUserId(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrlOrders}?userId=${userId}`);
  }


  addOrder(userId: number, newOrder:any) {
    console.log(newOrder);
    return this.http.post<Order[]>(this.apiUrlOrders, newOrder);
  }
}

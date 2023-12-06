/*order.service.ts*/
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Order } from "../../models/orderModel";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrlOrders = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) {}

  getOrdersByUserId(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrlOrders}?userId=${userId}`);
  }

  // Additional methods as needed...
}

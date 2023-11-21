import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService{

  private apiUrl = "/assets/data/products.json";

  constructor(private http: HttpClient) { }

  getProductsByCategory(category: string ): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  getAllProducts(): Observable<Product[]> {
    // Productデータを取得するAPI呼び出しを実行
    return this.http.get<Product[]>(this.apiUrl);
  }
  getAllProductsForUser(userId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/${userId}`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product, Cate } from '../models/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService{

  private apiUrl = "/assets/data/products.json";
  private cateUrl = "/assets/data/Cate.json";
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(`${this.apiUrl}`);
  }
  getAllCate(): Observable<Cate[]> {
      return this.http.get<Cate[]>(`${this.cateUrl}`);
  }

  getAllProductsForUser(userId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/${userId}`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

    getProductsByCategory(id: string): Observable<Product[]> {
      return this.http.get<Product[]>(`${this.apiUrl}/${id}`);

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


    getHomeErrand(): Observable<{ [key: string]: string[] }> {
        return this.http.get<Product[]>(`${this.apiUrl}`).pipe(
          map((products: Product[]) => {
             const categorisations: { [key:string]: string[] } = {};
              products.forEach(product => {
                  product.category.forEach((category) => {
                      const categoryName: string = category.name;

                      if (!categorisations[categoryName]) {
                          categorisations[categoryName] = [];
                      }
                      categorisations[categoryName].push(product.image);
                  });
              });
              console.log(categorisations);
              return categorisations;
          })
        );
    }
}


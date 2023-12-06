/*product.service.ts*/
import { Injectable } from '@angular/core';
import { catchError, forkJoin, Observable, switchMap, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Product } from "../../models/productModel";
import { ProductCategory } from "../../models/productCategoryModel";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrlProducts = 'http://localhost:3000/products';
  apiUrlProductCategories = 'http://localhost:3000/product_categories';
  apiUrlUsers = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}


    getAllProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrlProducts);
    }

    getAllProductCategories(): Observable<ProductCategory[]> {
        return this.http.get<ProductCategory[]>(this.apiUrlProductCategories);
    }

    getProductsByProductCategory(categoryId: number): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.apiUrlProducts}?productCategory=${categoryId}`);
    }

    getProductsByUserId(userId: number): Observable<Product[]> {
        return this.http.get<any>(`${this.apiUrlUsers}/${userId}`).pipe(
            switchMap(user => {
                if (!user.products || user.products.length === 0) {
                  console.log('No products found for user:', user);
                    return throwError(() => new Error('No products found for user.'));
                }
                const productRequests: Observable<Product>[] = user.products.map((productId: number) =>
                    this.http.get<Product>(`${this.apiUrlProducts}/${productId}`)
                );
                return forkJoin(productRequests);
            }),
            catchError(error => {
                console.error('Error fetching products:', error);
                return throwError(() => new Error('Error fetching products.'));
            })
        );
    }

    getProductByProductId(productId: number): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrlProducts}/${productId}`).pipe(
            catchError(error => {
                console.error(`Error fetching product with ID ${productId}:`, error);
                return throwError(() => new Error(`Error fetching product with ID ${productId}`));
            })
        );
    }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrlProducts}/${productId}`).pipe(
      catchError(error => {
        console.error('Error deleting product:', error);
        return throwError(() => new Error('Error deleting product.'));
      })
    );
  }
}

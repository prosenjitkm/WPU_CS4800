/*auth.service.ts*/

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {catchError, forkJoin, switchMap, tap, throwError} from "rxjs";
import {Product} from "../models/productModel";
import {ProductCategory} from "../models/productCategoryModel";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  apiUrlUsers = 'http://localhost:3000/users';
  apiUrlUserCategorys = 'http://localhost:3000/user_categories';
  apiUrlProducts = 'http://localhost:3000/products';
  apiUrlProductCategories = 'http://localhost:3000/product_categories';

    getAllUsers() {
    return this.http.get(this.apiUrlUsers);
  }

  getUserByUserId(id: any) {
    return this.http.get(`${this.apiUrlUsers}?id=${id}`);
  }

  getUserByUserName(userName: string) {
    return this.http.get(`${this.apiUrlUsers}?userName=${userName}`);
  }

  proceedRegister(inputData: any) {
    console.log('Sending registration data:', inputData);
    return this.http.post(this.apiUrlUsers, inputData)
      .pipe(
        tap(response => console.log('Received response:', response)),
        catchError(error => {
          console.error('Error occurred:', error);
          return throwError(error);
        })
      );
  }

  isLoggedIn() {
    return sessionStorage.getItem('userName') != null;
  }

  getUsersUserCategory(): number {
    const userCategory = sessionStorage.getItem('userCategory');
    return userCategory !== null ? parseInt(userCategory) : 0;
  }

  getAllUserCategory() {
    return this.http.get(this.apiUrlUserCategorys);
  }

  updateUser(id: any, inputdata: any) {
    return this.http.put(this.apiUrlUsers + '/' + id, inputdata);
  }

  GetUserbyCode(id: any) {
    return this.http.get(this.apiUrlUsers + '/' + id);

  }

  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrlUsers}/${id}`)
      .pipe(
        tap(response => console.log('User deleted:', response)),
        catchError(error => {
          console.error('Error deleting user:', error);
          return throwError(error);
        })
      );
  }

    getProductsByUserId(userId: number) {
        return this.http.get<any>(`${this.apiUrlUsers}/${userId}`).pipe(
            switchMap(user => {
                if (!user.products || user.products.length === 0) {
                    return throwError(() => new Error('No products found for user.'));
                }

                const productRequests = user.products.map((productId: number) => // Explicitly declare productId as number
                    this.http.get(`${this.apiUrlProducts}/${productId}`) // Corrected URL for fetching products
                );

                return forkJoin(productRequests);
            }),
            catchError(error => {
                console.error('Error fetching products:', error);
                return throwError(() => new Error('Error fetching products.'));
            })
        );
    }

  getAllProducts() {
    return this.http.get<Product[]>(this.apiUrlProducts);
  }

  getAllProductCategories() {
    return this.http.get<ProductCategory[]>(this.apiUrlProductCategories);
  }

  getProductsByCategory(categoryId: number) {
    return this.http.get<Product[]>(`${this.apiUrlProducts}?productCategory=${categoryId}`);
  }
}

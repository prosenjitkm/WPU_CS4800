import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model'; // Productモデルのインポート

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://example.com/api/products'; // あなたのAPIのエンドポイントに置き換えてください

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    // Productデータを取得するAPI呼び出しを実行
    return this.http.get<Product[]>(this.apiUrl);
  }

  // 他のProduct関連の操作を実装する場合、それらのメソッドもここに追加できます
}

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  selectedProduct: Product | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // Ideally, you'd fetch products based on a user or some other criteria.
    // For the sake of demonstration, we're not doing that here.
    // this.getAllProductsForUser(userId);
  }

  getAllProductsForUser(userId: number): void {
    this.productService.getAllProductsForUser(userId).subscribe(products => {
      this.products = products;
    });
  }

  editProduct(id: number): void {
    this.productService.getProductById(id).subscribe(product => {
      this.selectedProduct = product;
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(p => p.id !== id);
    });
  }

  saveProduct(): void {
    if (this.selectedProduct) {
      if (this.selectedProduct.id) {
        // Update existing product
        this.productService.updateProduct(this.selectedProduct.id, this.selectedProduct).subscribe(product => {
          this.selectedProduct = null;
        });
      } else {
        // Create new product
        this.productService.createProduct(this.selectedProduct).subscribe(product => {
          this.products.push(product);
          this.selectedProduct = null;
        });
      }
    }
  }

  newProduct(): void {
    this.selectedProduct = new Product();
  }

  cancelEdit(): void {
    this.selectedProduct = null;
  }
}

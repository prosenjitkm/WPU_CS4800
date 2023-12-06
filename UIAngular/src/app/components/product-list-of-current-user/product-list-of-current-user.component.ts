/*product-list-of-current-user.component.html*/
import { Component, OnInit } from '@angular/core';
import { Product } from "../../models/productModel";
import { ProductService } from "../../service/product/product.service";
import { AuthorizationService } from "../../service/auth/authorization.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-product-list-of-current-user',
  templateUrl: './product-list-of-current-user.component.html',
  styleUrl: './product-list-of-current-user.component.css'
})
export class ProductListOfCurrentUserComponent implements OnInit {
  products: Product[] = [];
  userId: number | null;

  constructor(private productService: ProductService,
              private authService: AuthorizationService,
              private toastr: ToastrService
  ) {this.userId = null;}

  ngOnInit(): void {
    this.userId = this.authService.getCurrentUserId();
    if (this.userId) {
      console.log(`The current userID is ${this.userId}`);
      this.fetchMyProducts(this.userId);
    }
  }


  fetchMyProducts(userId: number) {
    this.productService.getProductsByUserId(userId).subscribe(
      (products: Product[]) => {
        this.products = products;
        console.log('Fetched products successfully:', products);
      },
      error => {
        console.error('Error fetching products:', error);
        this.toastr.error('Failed to fetch products');
      }
    );
  }

  onDeleteMyProduct(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(() => {
      this.products = this.products.filter(p => p.id !== product.id);
      this.toastr.success('Product deleted successfully');
      console.log(`Product with ID ${product.id} deleted successfully`);
    }, error => {
      console.error('Error deleting product:', error);
      this.toastr.error('Failed to delete product');
    });
  }

  onUpdateMyProduct(product: Product) {
    // Implement the logic to navigate to the update page or open a modal/dialog
    console.log(`Navigating to update product with ID ${product.id}`);
    // For example, using Angular Router:
    // this.router.navigate(['/update-product', product.id]);
  }

}

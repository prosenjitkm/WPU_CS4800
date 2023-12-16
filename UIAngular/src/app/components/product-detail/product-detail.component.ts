/*product-detail.component.ts*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from "../../models/productModel";
import { ProductService } from "../../service/product/product.service";
import {ToastrService} from "ngx-toastr";
import { AuthorizationService} from "../../service/auth/authorization.service";
import { CartService } from "../../service/cart/cart.service";

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
    product: Product | any;

    isAdmin= false;
    isSeller = false;
    isBuyer = false;
    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private router: Router,
        private toastr: ToastrService,
        private authService: AuthorizationService,
        private cartService: CartService,
    ) {
      this.checkUserCategory()
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.productService.getProductByProductId(+id).subscribe(
                product => {
                    this.product = product;
                },
                error => {
                    console.error('Error fetching product details:', error);
                    this.toastr.error('Failed to load product details', 'Error'); // Toastr error notification
                    this.router.navigate(['/shop']); // Redirect back to shop on error
                }
            );
        } else {
            console.error('No product ID found in route parameters');
            this.toastr.error('Product not found', 'Error'); // Toastr error notification
            this.router.navigate(['/shop']); // Redirect back to shop if no ID is found
        }
    }

    checkUserCategory() {
      let userCategory = sessionStorage.getItem('userCategory');
      let parsedUserCategory = userCategory ? parseInt(userCategory, 10) : 0;
      parsedUserCategory = isNaN(parsedUserCategory) ? 0 : parsedUserCategory;

      this.isAdmin = parsedUserCategory === 1;
      this.isSeller = parsedUserCategory === 3;
      this.isBuyer = parsedUserCategory === 2;
    }
    goBackToShop() {
        this.router.navigate(['/shop']); // Make sure the route is defined in your routing module
    }

    goBackToProductList(){
      this.router.navigate(["/products", this.product.user])
    }

    addToCart(){
      const userId = this.authService.getCurrentUserId();
      if (userId) {;
        this.cartService.addToCart(userId, this.product.id).subscribe(() => {
          this.toastr.success('Product added to cart');
        }, (error: any) => {
          console.error('Error adding to cart:', error);
          this.toastr.error('Error adding product to cart');
        });
      } else {
        this.toastr.error('User not identified');
      }
    }
}

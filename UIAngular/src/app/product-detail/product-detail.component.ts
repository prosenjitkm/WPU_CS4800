/*product-detail.component.ts*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "../service/auth.service";
import { Product } from "../models/productModel";

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
    product: Product | any;

    constructor(
        private route: ActivatedRoute,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        const productId = this.route.snapshot.paramMap.get('id');
        if (productId) {
            this.authService.getProductByProductId(+productId).subscribe(product => {
                this.product = product;
            });
        }
    }

    goBack() {
        this.router.navigate(['/shop']); // Make sure the route is defined in your routing module
    }
}

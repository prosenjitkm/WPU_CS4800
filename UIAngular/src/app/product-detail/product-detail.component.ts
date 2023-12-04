/*product-detail.component.ts*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "../service/auth/auth.service";
import { Product } from "../core/models/productModel";

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
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.authService.getProductByProductId(+id).subscribe(product => {
                this.product = product;
            });
        }
    }

    goBack() {
        this.router.navigate(['/shop']); // Make sure the route is defined in your routing module
    }
}

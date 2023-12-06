/*cart.component.ts*/
import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from "../../service/auth/authorization.service";
import { ToastrService } from "ngx-toastr";
import { Cart } from "../../models/cartModel";
import { CartItem } from "../../models/cartItemModel";
import { CartService } from "../../service/cart/cart.service";
import { Product} from "../../models/productModel";
import { ProductService } from "../../service/product/product.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

}

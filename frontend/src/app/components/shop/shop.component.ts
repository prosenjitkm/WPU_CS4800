import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product, columnNames } from "../../shared/models/product";
import { PaginatorComponent } from "../paginator/paginator.component";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})

export class ShopComponent implements OnInit {
  @ViewChild(PaginatorComponent) paginator!: PaginatorComponent;
  products : Product[] = [];
  //displayedProducts: any | undefined = this.paginator.displayedItems;


  constructor(private productService: ProductService) {
  }
  ngOnInit() {
    // this.loadProducts();
    this.productService.getAllProducts()
      .subscribe(response => {
        this.products = response;
        //this.dataSource = new MatTableDataSource(this.products);
        //this.dataSource.paginator = this.paginator;
        //this.dataSource.sort = this.sort;

      });


    //const limit :number = 40;
    //this.limitedProducts = this.getLimitedProducts(limit);

  }


  //getLimitedProducts(limit: number): Product[] {
    // Return a limited number of products
   // return this.products.slice(0, limit);
  //}

  /*
  getProductValue(product: Product, column: string): string | number | boolean {
    // Add logic to return appropriate product value based on the column name
    switch (column) {
      case 'sku': return product.sku;
      case 'name': return product.name;
      case 'type': return product.type;
      case 'price': return product.price;
      case 'upc': return product.upc;
      case 'category':
        // Assuming you want to return a concatenated string of category names
        return product.category.map(cat => cat.name).join(', ');
      case 'shipping': return product.shipping;
      case 'description': return product.description;
      case 'manufacturer': return product.manufacturer;
      case 'model': return product.model;
      case 'url': return product.url;
      case 'image': return product.image;

      // You might not need a value for other columns
      default: return '';
    }
  }
  getColumnHeader(column: string): string {
    // Add logic to return appropriate header based on the column name
    switch (column) {
      case 'sku': return 'SKU';
      case 'name': return 'Name';
      case 'type': return 'Type';
      case 'price': return 'Price';
      case 'upc': return 'UPC';
      case 'category': return 'Category';
      case 'shipping': return 'Shipping';
      case 'description': return 'Description';
      case 'manufacturer': return 'Manufacturer';
      case 'model': return 'Model';
      case 'url': return 'URL';
      case 'image': return 'Image';

      // You might not need a header for other columns
      default: return '';
    }
  }
  */



}

import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd} from "@angular/router";
import { filter } from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {columnNames, Product} from "../../shared/models/product";
import { ProductService } from "../../shared/services/product.service";



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = columnNames;
  dataSource: any;
  products: Product[] = [];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router, private Category: String) {

  }

  ngOnInit() {
    this.productService.getAllProducts()
        .subscribe(response => {
          this.products = response;
          this.dataSource = new MatTableDataSource(this.products);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
  }


  /*


    this.route.queryParams
        .subscribe(params => {
          const query: string = params['id'];
          if (query ) {
            this.Category = decodeURIComponent(query);
            this.productService.getAllProducts()
                .subscribe(response => {
                  this.products = response;
                  this.products = this.products.filter(product => product.category[0].name === this.Category);
                  console.log(this.products);
                  this.dataSource = new MatTableDataSource(this.products);
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
                });
          }
          else {
            this.productService.getAllProducts()
                .subscribe(response => {
                  this.products = response;
                  this.dataSource = new MatTableDataSource(this.products);
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
                });
          }
        });




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



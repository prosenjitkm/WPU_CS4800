import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import { Subject } from 'rxjs';
import { ProductService } from '../../shared/services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {Product, columnNames} from "../../shared/models/product";


@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public products : Product[] = [];
  public Object = Object

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    // this.loadProducts();
    this.productService.getAllProducts()
      .subscribe(response => {
        this.products = response;
        });



      console.log("Work");
console.log(this.products)


  }
    map(): { [key: string]: string[] }
    {
    const  categorisations: { [key: string]: string[] } = {};

        // Iterate through each product
        this.products.forEach(product => {
            product.category.forEach((category) => {
                const categoryName: string = category.name;

                // Check if the category exists in the map
                if (!categorisations[categoryName]) {
                    categorisations[categoryName] = [];
                }

                // Push the product URL to the respective category in the map
                categorisations[categoryName].push(product.url);
            });
        });

        console.log(Object.keys(this.products));
        console.log(Object.values(categorisations))

        return categorisations;
    }

}

/*
  mapCategoriestoUrls(): { [key: string]: string[] } {
      const categoriestourls: { [key: string]: string[] } = {};

      // Iterate through each product
      this.products.forEach(product => {
          product.category.forEach((category) => {
              const categoryName: string = category.name;

              // Check if the category exists in the map
              if (!categoriestourls[categoryName]) {
                  categoriestourls[categoryName] = [];
              }

              // Push the product URL to the respective category in the map
              categoriestourls[categoryName].push(product.url);
          });
      });
      return categoriestourls;
  }




  getFirstURLsOfAllCategories(): string[] {
    const firstURLs: string[] = [];
    const uniqueCategories = this.getAllCategories();

    uniqueCategories.forEach(category => {
      const productsInCategory = this.getProductsByCategory(category);
      if (productsInCategory.length > 0) {
        firstURLs.push(productsInCategory[0].url);
      }
    });
    return firstURLs;
  }  */


  /*dropdownValue: string = '';
    private dropdownValueSubject = new Subject<string>();

    dropdownValue$ = this.dropdownValueSubject.asObservable();

    ngOnInit() {
      this.dropdownValue$.subscribe((value) => {
        this.dropdownValue = value;
      });
    }


    setDropdownValue(value: string) {
      this.dropdownValueSubject.next(value);
    }

    updateDropdownValue() {
      this.setDropdownValue(this.dropdownValue)
    }
    */

import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router'
import { ProductService } from '../../shared/services/product.service';
import {Product, columnNames, Cate} from '../../shared/models/product';


@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  category: Cate[] = [];
  //categorisations: { [key: string]: string[] } = {};

  svgCode: string = `
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#fffcfc" height="800px" width="800px" version="1.1" id="Capa_1" viewBox="0 0 463 463" xml:space="preserve">
  <g>
      <path d="M367.5,0h-272C86.953,0,80,6.953,80,15.5v432c0,8.547,6.953,15.5,15.5,15.5h272c8.547,0,15.5-6.953,15.5-15.5v-432   C383,6.953,376.047,0,367.5,0z M95,447.5v-432c0-0.276,0.224-0.5,0.5-0.5H200v433H95.5C95.224,448,95,447.776,95,447.5z M368,447.5   c0,0.276-0.224,0.5-0.5,0.5H215V15h152.5c0.276,0,0.5,0.224,0.5,0.5V447.5z" fill="#fffcfc"/>
  <path d="M175.5,136c-4.142,0-7.5,3.358-7.5,7.5v176c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-176   C183,139.358,179.642,136,175.5,136z" fill="#fffcfc"/>
  <path d="M239.5,136c-4.142,0-7.5,3.358-7.5,7.5v176c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-176   C247,139.358,243.642,136,239.5,136z" fill="#fffcfc"/>
  <path d="M151.5,184h-40c-4.142,0-7.5,3.358-7.5,7.5v80c0,4.142,3.358,7.5,7.5,7.5h40c4.142,0,7.5-3.358,7.5-7.5v-80   C159,187.358,155.642,184,151.5,184z M144,199v9h-25v-9H144z M119,264v-41h25v41H119z" fill="#fffcfc"/>
      </g>
      </svg>`;

  constructor(private productService: ProductService, private router: Router) {
  }

  ngOnInit() {

    this.productService.getAllCate()
        .subscribe(response  => {
        this.category = response;
    });
  }





}

/*
  let category: string[] = Object.keys(this.categorisations);

  mapper(): { [key: string]: string[] }
  {
    const categorisations: { [key: string]: string[] } = {};

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



}*/

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

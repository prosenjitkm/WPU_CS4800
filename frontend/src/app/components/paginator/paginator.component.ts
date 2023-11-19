import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit  } from '@angular/core';
import { Product } from '../../shared/models/product';
import {ProductService} from "../../shared/services/product.service";
@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnChanges, OnInit {
  @Input() items: Product[] = [];
  itemsPerPage: number = 5;

  pageChange = new EventEmitter<any[]>();

  totalPages: number = 0;
  currentPage: number = 1;
  displayedItems: Product[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.productService.getAllProducts()
      .subscribe(response => {
        this.items = response;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes[this.items.length]) {
      this.calculateTotalPages();
      this.updateDisplayedItems();
    }
  }



  calculateTotalPages() {
    this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
  }

  updateDisplayedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedItems = this.items.slice(startIndex, endIndex);
    this.pageChange.emit(this.displayedItems);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedItems();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedItems();
    }
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  getEndIndex(): number {
    const endIndex = this.currentPage * this.itemsPerPage;
    return endIndex > this.items.length ? this.items.length : endIndex;
  }
}

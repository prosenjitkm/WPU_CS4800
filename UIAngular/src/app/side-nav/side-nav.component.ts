/*side-nav.component.ts*/

import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  @Input() categories: any[] = [];
  @Output() categorySelected = new EventEmitter<number>();

  // Method to emit selected category
  selectCategory(categoryId: number) {
    this.categorySelected.emit(categoryId);
  }
}

/*side-nav.component.ts*/
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  @Input() categories: any[] = [];
  @Output() categorySelected = new EventEmitter<number>();

  selectCategory(id: number) {
    this.categorySelected.emit(id);
  }
}

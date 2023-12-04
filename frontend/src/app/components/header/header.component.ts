import { Component } from '@angular/core';
import {SearchService} from "../../shared/services/search.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchQuery: string = '';
  constructor( private service: SearchService) {}

  submitSearch(): void {
    // Check if the searchQuery is not empty before calling the service
    if (this.searchQuery.trim() !== '') {
      // Call your search service method here with the searchQuery
      this.service.search(this.searchQuery)
        .subscribe((results) => {
          // Handle search results if needed
          console.log('Search results:', results);
        });
    }
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListOfCurrentUserComponent } from './product-list-of-current-user.component';

describe('ProductListOfCurrentUserComponent', () => {
  let component: ProductListOfCurrentUserComponent;
  let fixture: ComponentFixture<ProductListOfCurrentUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListOfCurrentUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductListOfCurrentUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

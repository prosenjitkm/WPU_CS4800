import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListOfCurrentUserDeleteAProductComponent } from './product-list-of-current-user-delete-a-product.component';

describe('ProductListOfCurrentUserDeleteAProductComponent', () => {
  let component: ProductListOfCurrentUserDeleteAProductComponent;
  let fixture: ComponentFixture<ProductListOfCurrentUserDeleteAProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListOfCurrentUserDeleteAProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductListOfCurrentUserDeleteAProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

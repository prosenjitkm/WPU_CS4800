import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListForShopComponent } from './product-list-for-shop.component';

describe('ProductListComponent', () => {
  let component: ProductListForShopComponent;
  let fixture: ComponentFixture<ProductListForShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListForShopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListForShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

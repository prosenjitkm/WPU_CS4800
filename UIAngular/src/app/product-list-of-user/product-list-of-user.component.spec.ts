import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListOfUserComponent } from './product-list-of-user.component';

describe('ProductListOfUserComponent', () => {
  let component: ProductListOfUserComponent;
  let fixture: ComponentFixture<ProductListOfUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListOfUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductListOfUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

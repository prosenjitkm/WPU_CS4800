import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListOfAllUsersComponent } from './product-list-of-all-users.component';

describe('ProductListOfUserComponent', () => {
  let component: ProductListOfAllUsersComponent;
  let fixture: ComponentFixture<ProductListOfAllUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListOfAllUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListOfAllUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

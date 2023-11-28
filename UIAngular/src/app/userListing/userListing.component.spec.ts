import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListingComponent } from './userListing.component';

describe('UserlistingComponent', () => {
  let component: UserListingComponent;
  let fixture: ComponentFixture<UserListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

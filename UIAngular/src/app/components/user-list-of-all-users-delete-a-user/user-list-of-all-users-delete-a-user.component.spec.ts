import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListOfAllUsersDeleteAUserComponent } from './user-list-of-all-users-delete-a-user.component';

describe('DeleteUserPopUpComponent', () => {
  let component: UserListOfAllUsersDeleteAUserComponent;
  let fixture: ComponentFixture<UserListOfAllUsersDeleteAUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListOfAllUsersDeleteAUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListOfAllUsersDeleteAUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

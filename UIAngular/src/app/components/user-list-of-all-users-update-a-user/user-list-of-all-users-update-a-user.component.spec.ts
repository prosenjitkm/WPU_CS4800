import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListOfAllUsersUpdateAUserComponent } from './user-list-of-all-users-update-a-user.component';

describe('updatePopUpComponent', () => {
  let component: UserListOfAllUsersUpdateAUserComponent;
  let fixture: ComponentFixture<UserListOfAllUsersUpdateAUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListOfAllUsersUpdateAUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListOfAllUsersUpdateAUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

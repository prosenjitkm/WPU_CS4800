import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListOfAllUsersComponent } from './user-list-of-all-users.component';

describe('UserlistingComponent', () => {
  let component: UserListOfAllUsersComponent;
  let fixture: ComponentFixture<UserListOfAllUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListOfAllUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListOfAllUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserPopUpComponent } from './delete-user-pop-up.component';

describe('DeleteUserPopUpComponent', () => {
  let component: DeleteUserPopUpComponent;
  let fixture: ComponentFixture<DeleteUserPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteUserPopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteUserPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

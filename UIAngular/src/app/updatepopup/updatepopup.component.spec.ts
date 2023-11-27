import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatepopupComponent } from './updatepopup.component';

describe('UpdatepopupComponent', () => {
  let component: UpdatepopupComponent;
  let fixture: ComponentFixture<UpdatepopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatepopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/*buyer.guard.spec.ts*/
import { TestBed } from '@angular/core/testing';
import { BuyerGuard } from './buyer.guard';

describe('BuyerGuard', () => {
  let guard: BuyerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BuyerGuard);
  });
  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { SellerGuard } from './seller.guard';

describe('SellerGuard', () => {
  let guard: SellerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SellerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

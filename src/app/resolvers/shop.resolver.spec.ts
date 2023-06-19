import { TestBed } from '@angular/core/testing';

import { ShopResolver } from './shop.resolver';

describe('ShopResolver', () => {
  let resolver: ShopResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ShopResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

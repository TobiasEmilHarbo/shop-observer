import { TestBed } from '@angular/core/testing';

import { ShopObserverService } from './shop-observer.service';

describe('ShopObserverService', () => {
  let service: ShopObserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopObserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

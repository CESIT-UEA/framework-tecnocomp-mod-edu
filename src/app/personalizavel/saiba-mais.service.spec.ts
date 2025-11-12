import { TestBed } from '@angular/core/testing';

import { SaibaMaisService } from './saiba-mais.service';

describe('SaibaMaisService', () => {
  let service: SaibaMaisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaibaMaisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

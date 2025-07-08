import { TestBed } from '@angular/core/testing';

import { EnjeuxService } from './enjeux.service';

describe('EnjeuxService', () => {
  let service: EnjeuxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnjeuxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

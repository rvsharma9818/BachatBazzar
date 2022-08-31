import { TestBed } from '@angular/core/testing';

import { PayemntService } from './payemnt.service';

describe('PayemntService', () => {
  let service: PayemntService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayemntService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

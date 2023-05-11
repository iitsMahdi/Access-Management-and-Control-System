import { TestBed } from '@angular/core/testing';

import { ClientAccService } from './client-acc.service';

describe('ClientAccService', () => {
  let service: ClientAccService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientAccService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

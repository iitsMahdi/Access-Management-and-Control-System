import { TestBed } from '@angular/core/testing';

import { Client2Service } from './client2.service';

describe('Client2Service', () => {
  let service: Client2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Client2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

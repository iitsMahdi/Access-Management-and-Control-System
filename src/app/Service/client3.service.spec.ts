import { TestBed } from '@angular/core/testing';

import { Client3Service } from './client3.service';

describe('Client3Service', () => {
  let service: Client3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Client3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

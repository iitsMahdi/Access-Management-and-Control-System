import { TestBed } from '@angular/core/testing';

import { CardSocketService } from './card-socket.service';

describe('CardSocketService', () => {
  let service: CardSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

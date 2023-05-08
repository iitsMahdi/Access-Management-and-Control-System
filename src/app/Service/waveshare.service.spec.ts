import { TestBed } from '@angular/core/testing';

import { WaveshareService } from './waveshare.service';

describe('WaveshareService', () => {
  let service: WaveshareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaveshareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

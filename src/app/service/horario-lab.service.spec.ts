import { TestBed } from '@angular/core/testing';

import { HorarioLabService } from './horario-lab.service';

describe('HorarioLabService', () => {
  let service: HorarioLabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorarioLabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

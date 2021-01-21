import { TestBed } from '@angular/core/testing';

import { HorarioTrapService } from './horario-trap.service';

describe('HorarioTrapService', () => {
  let service: HorarioTrapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorarioTrapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

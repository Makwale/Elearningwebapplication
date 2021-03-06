import { TestBed } from '@angular/core/testing';

import { InstructorAccountService } from './instructor-account.service';

describe('InstructorAccountService', () => {
  let service: InstructorAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstructorAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

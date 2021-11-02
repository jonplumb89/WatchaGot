import { TestBed } from '@angular/core/testing';

import { AspNetUserService } from './asp-net-user.service';

describe('AspNetUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AspNetUserService = TestBed.get(AspNetUserService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { MyrecipesService } from './myrecipes.service';

describe('MyrecipesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyrecipesService = TestBed.get(MyrecipesService);
    expect(service).toBeTruthy();
  });
});

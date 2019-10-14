import { TestBed } from '@angular/core/testing';

import { OpenPageService } from './open-page.service';

describe('OpenPageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpenPageService = TestBed.get(OpenPageService);
    expect(service).toBeTruthy();
  });
});

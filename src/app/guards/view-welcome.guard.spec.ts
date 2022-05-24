import { TestBed } from '@angular/core/testing';

import { ViewWelcomeGuard } from './view-welcome.guard';

describe('ViewWelcomeGuard', () => {
  let guard: ViewWelcomeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ViewWelcomeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

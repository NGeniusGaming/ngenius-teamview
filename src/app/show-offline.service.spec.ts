import { TestBed } from '@angular/core/testing';

import { ShowOfflineService } from './show-offline.service';

describe('ShowOfflineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShowOfflineService = TestBed.get(ShowOfflineService);
    expect(service).toBeTruthy();
  });
});

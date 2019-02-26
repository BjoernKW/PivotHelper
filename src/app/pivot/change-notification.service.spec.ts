import { TestBed } from '@angular/core/testing';

import { ChangeNotificationService } from './change-notification.service';

describe('ChangeNotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChangeNotificationService = TestBed.get(ChangeNotificationService);
    expect(service).toBeTruthy();
  });
});

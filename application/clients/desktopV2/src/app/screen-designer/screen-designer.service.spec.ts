import { TestBed } from '@angular/core/testing';

import { ScreenDesignerService } from './screen-designer.service';

describe('ScreenDesignerService', () => {
  let service: ScreenDesignerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenDesignerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

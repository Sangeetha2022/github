import { TestBed } from '@angular/core/testing';

import { MenuBuilderService } from './menu-builder.service';

describe('MenuBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuBuilderService = TestBed.get(MenuBuilderService);
    expect(service).toBeTruthy();
  });
});

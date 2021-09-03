import { TestBed } from '@angular/core/testing';

import { ProjectComponentService } from './project-component.service';

describe('ProjectComponentService', () => {
  let service: ProjectComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectorManagerComponent } from './techarchitecture-manager.component';

describe('TecharchitectureManagerComponent', () => {
  let component: ConnectorManagerComponent;
  let fixture: ComponentFixture<ConnectorManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectorManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectorManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

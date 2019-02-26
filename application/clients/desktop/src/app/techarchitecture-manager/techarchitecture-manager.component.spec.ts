import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectorManagerComponent } from './techarchitecture-manager.component';

describe('ConnectorManagerComponent', () => {
  let component: ConnectorManagerComponent;
  let fixture: ComponentFixture<ConnectorManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectorManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectorManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

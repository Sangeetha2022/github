import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableConnectorComponent } from './available-connector.component';

describe('AvailableConnectorComponent', () => {
  let component: AvailableConnectorComponent;
  let fixture: ComponentFixture<AvailableConnectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableConnectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableConnectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

connector_admin_component_spec(object) ::= <<
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { $object.className$Component } from './$object.folderName$.component';

describe('$object.className$Component', () => {
  let component: $object.className$Component;
  let fixture: ComponentFixture<$object.className$Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ $object.className$Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent($object.className$Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
>>
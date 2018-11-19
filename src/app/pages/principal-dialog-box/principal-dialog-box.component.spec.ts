import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalDialogBoxComponent } from './principal-dialog-box.component';

describe('PrincipalDialogBoxComponent', () => {
  let component: PrincipalDialogBoxComponent;
  let fixture: ComponentFixture<PrincipalDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipalDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

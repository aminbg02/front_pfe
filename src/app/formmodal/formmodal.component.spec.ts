import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormmodalComponent } from './formmodal.component';

describe('FormmodalComponent', () => {
  let component: FormmodalComponent;
  let fixture: ComponentFixture<FormmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

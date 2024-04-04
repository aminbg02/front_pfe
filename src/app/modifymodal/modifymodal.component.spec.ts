import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifymodalComponent } from './modifymodal.component';

describe('ModifymodalComponent', () => {
  let component: ModifymodalComponent;
  let fixture: ComponentFixture<ModifymodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifymodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifymodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

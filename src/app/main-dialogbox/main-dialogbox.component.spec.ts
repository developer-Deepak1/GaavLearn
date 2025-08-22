import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDialogboxComponent } from './main-dialogbox.component';

describe('MainDialogboxComponent', () => {
  let component: MainDialogboxComponent;
  let fixture: ComponentFixture<MainDialogboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainDialogboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainDialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

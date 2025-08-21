import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTeacherAdminComponent } from './dashboard-teacher-admin.component';

describe('DashboardTeacherAdminComponent', () => {
  let component: DashboardTeacherAdminComponent;
  let fixture: ComponentFixture<DashboardTeacherAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTeacherAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTeacherAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

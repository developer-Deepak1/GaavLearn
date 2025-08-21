import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardClientAdminComponent } from './dashboard-client-admin.component';

describe('DashboardClientAdminComponent', () => {
  let component: DashboardClientAdminComponent;
  let fixture: ComponentFixture<DashboardClientAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardClientAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardClientAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

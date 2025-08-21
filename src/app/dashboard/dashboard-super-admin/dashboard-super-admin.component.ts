import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from "src/app/demo/shared/shared.module";

@Component({
  selector: 'app-dashboard-super-admin',
  imports: [SharedModule,CommonModule],
  templateUrl: './dashboard-super-admin.component.html',
  styleUrl: './dashboard-super-admin.component.scss'
})
export class DashboardSuperAdminComponent {
 cards: any[] = [
        {title: 'Total Students', count: 500, subtitle: 'Students enrolled', color: '#4CAF50' },
        { title: 'Total Classes', count: 10, subtitle: 'Classes available', color: '#2196F3' },
        { title: 'Total Teachers', count: 15, subtitle: 'Teachers available', color: '#FF9800' },
        { title: 'Total Subjects', count: 8, subtitle: 'Subjects offered', color: '#9C27B0' }
  ];
}

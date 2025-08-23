import { Navigation } from 'src/app/@theme/types/navigation';

export const menus: Navigation[] = [
  {
    id: 'navigation',
    title: 'Dashboard',
    type: 'item',
    classes: 'nav-item',
    icon: '#custom-home',
    url: '/dashboard',
  },
  {
    id: 'user',
    title: 'User Management',
    type: 'group',
    icon: 'icon-user',
    url: '/user-listing',
    children: [
      {
        id: 'addUser',
        title: 'Add User',
        type: 'item',
        classes: 'nav-item',
        url: '/user-add-edit',
        icon: '#custom-user-add'
      },
      {
        id: 'ListUser',
        title: 'User Listing',
        type: 'item',
        classes: 'nav-item',
        url: '/user-listing',
        icon: '#custom-user-bold'
      }
    ]
  },
  {
    id: 'teacher',
    title: 'Teacher',
    type: 'group',
    icon: 'icon-book-open',
    url: '/teacher-listing',
    children: [
      {
        id: 'add',
        title: 'Add Teacher',
        type: 'item',
        classes: 'nav-item',
        url: '/teacher-add',
        icon: '#custom-flag'
      },
      {
        id: 'listing',
        title: 'Teacher Listing',
        type: 'item',
        classes: 'nav-item',
        url: '/teacher-listing',
        icon: '#custom-data'
      },
      {
        id: 'attendance',
        title: 'Attendance Report',
        type: 'item',
        classes: 'nav-item',
        url: '/teacher-attendance-report',
        icon: '#custom-calendar-1'
      }
    ]
  },
  {
    id: 'student',
    title: 'Student',
    type: 'group',
    icon: 'icon-book-open',
    url: '/student-list',
    children: [
      {
        id: 'listing',
        title: 'Student Listing',
        type: 'item',
        classes: 'nav-item',
        url: '/student-list',
        icon: '#custom-kanban'
      },
      {
        id: 'attendance',
        title: 'Student Attendance',
        type: 'item',
        classes: 'nav-item',
        url: '/student-attendance',
        icon: '#custom-calendar-1'
      }
    ]
  }
];

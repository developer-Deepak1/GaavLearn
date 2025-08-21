import { Navigation } from 'src/app/@theme/types/navigation';

export const menus: Navigation[] = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'Dashboard',
        title: 'Dashboard',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard',
        icon: '#custom-status-up'
      }
    ]
  },
  {
    id: 'user',
    title: 'User Management',
    type: 'group',
    icon: 'icon-navigation',
    children: [
       {
        id: 'addUser',
        title: 'Add User',
        type: 'item',
        classes: 'nav-item',
        url: '/user-add-edit',
        icon: '#custom-status-up'
      },  
      {
        id: 'ListUser',
        title: 'User Listing',
        type: 'item',
        classes: 'nav-item',
        url: '/user-listing',
        icon: '#custom-status-up'
      }
    ]
  },
  {
    id: 'student',
    title: 'Student',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'listing',
        title: 'Student Listing',
        type: 'item',
        classes: 'nav-item',
        url: '/student-list',
        icon: '#custom-status-up'
      },
      {
        id: 'attendance',
        title: 'Student Attendance',
        type: 'item',
        classes: 'nav-item',
        url: '/student-attendance',
        icon: '#custom-status-up'
      }
    ]
  },
  {
    id: 'fee',
    title: 'Student Fees',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'fee',
        title: 'Student fee',
        type: 'item',
        classes: 'nav-item',
        url: '/fee-receipt',
        icon: '#custom-status-up'
      }
    ]
  }
  
];

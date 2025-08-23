// Angular import
import { Component, OnInit, inject, viewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';

// Project import
import { menus } from 'src/app/demo/data/menu';
import { LayoutService } from 'src/app/@theme/services/layout.service';
import { environment } from 'src/environments/environment';
import { FooterComponent } from 'src/app/@theme/layouts/footer/footer.component';
import { BreadcrumbComponent } from 'src/app/@theme/layouts/breadcrumb/breadcrumb.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from 'src/app/@theme/layouts/toolbar/toolbar.component';
import { VerticalMenuComponent } from 'src/app/@theme/layouts/menu/vertical-menu';
import { MainDialogboxComponent } from 'src/app/main-dialogbox/main-dialogbox.component';
import { MenuItem } from 'src/app/commonService/user.model';
import { UserService } from 'src/app/commonService/user.service';
import { Navigation, NavigationItem } from 'src/app/@theme/types/navigation';

@Component({
  selector: 'app-admin',
  imports: [FooterComponent, MainDialogboxComponent, BreadcrumbComponent, SharedModule, RouterModule, NavBarComponent, VerticalMenuComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  private layoutService = inject(LayoutService);
  private userService = inject(UserService);
  public menus1: Navigation[] = [];
  // public props
  sidebar = viewChild<MatDrawer>('sidebar');
  menus = menus;
  modeValue: MatDrawerMode = 'side';
  currentApplicationVersion = environment.appVersion;

  // life cycle event
  ngOnInit() {
    this.breakpointObserver.observe(['(min-width: 1025px)', '(max-width: 1024.98px)']).subscribe((result) => {
      if (result.breakpoints['(max-width: 1024.98px)']) {
        this.modeValue = 'over';
      } else if (result.breakpoints['(min-width: 1025px)']) {
        this.modeValue = 'side';
      }
    });

    this.layoutService.layoutState.subscribe(() => {
      this.sidebar()?.toggle();
    });
    this.userService.getMenuItemsForUser().subscribe((menuItems) => {
      this.menus1= this.mapMenuToNavigation(this.buildMenu(menuItems));
    });
  }
      private buildMenu(items: MenuItem[]): MenuItem[] {
        const itemMap: { [key: number]: MenuItem } = {};
        const menu: MenuItem[] = [];

        items.forEach(item => {
          item.children = [];
          itemMap[item.id] = item;
        });

        items.forEach(item => {
          if (item.parent_id === 0) {
            menu.push(item);
          } else {
            const parent = itemMap[item.parent_id];
            if (parent) {
              parent.children!.push(item);
            }
          }
        });

        function pruneEmptyChildren(nodes: MenuItem[]) {
          nodes.forEach(node => {
            if (node.children && node.children.length === 0) {
              delete node.children;
            } else if (node.children) {
              pruneEmptyChildren(node.children);
            }
          });
        }
        pruneEmptyChildren(menu);

      return menu;
    }

  private mapMenuToNavigation(menuItems: MenuItem[]): NavigationItem[] {
    return menuItems.map(item => {
      const navItem: NavigationItem = {
        id: item.id.toString(),
        title: item.title,
        type: this.mapType(item.type), // map your type from MenuItem to NavigationItem ('item', 'group', 'collapse')
        icon: item.icon ?? undefined,
        url: item.url ?? undefined,
        classes: item.classes ?? undefined,
        children: item.children ? this.mapMenuToNavigation(item.children) : undefined,
        hidden: item.id==8 ? false : true
      };
      return navItem;
    });
  }

  private mapType(type: string): 'item' | 'collapse' | 'group' {
    switch (type) {
      case 'group': return 'group';
      case 'collapse': return 'collapse';
      case 'item':
      default:
        return 'item';
    }
  }
}
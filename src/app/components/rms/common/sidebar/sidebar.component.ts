import {Component} from '@angular/core';
import firebase from 'firebase';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  public user = firebase.auth().currentUser;

  public config = {
    interfaceWithRoute: false,
    paddingAtStart: true,
    highlightOnSelect: true,
    collapseOnSelect: true,
    useDividers: false,
    rtlLayout: false
  };

  public items = [
    {
      label: 'Reports', icon: 'signal_cellular_alt',
    },
    {
      label: 'Finances', icon: 'attach_money',
    },
    {
      label: 'Menu', icon: 'notes', items: [
        {label: 'Products', link: '/rms/menu/products'},
        {label: 'Dishes', link: '/rms/menu/dishes'},
        {label: 'Prepacks', link: '/rms/menu/prepacks'},
        {label: 'Ingredients', link: '/rms/menu/ingredients'},
        {label: 'Categories', link: '/rms/menu/menu-categories'},
        {label: 'Workshops', link: '/rms/menu/workshops'}
      ]
    },
    {
      label: 'Inventory', icon: 'inventory', items: [
        {label: 'Stock', link: '/rms/inventory/stock'},
        {label: 'Supplies', link: '/rms/inventory/supplies'},
        {label: 'Suppliers', link: '/rms/inventory/suppliers'},
        {label: 'Inventory Checks', link: '/rms/inventory/inventories'},
        {label: 'Write Offs', link: '/rms/inventory/write-offs'},
        {label: 'Packs', link: '/rms/inventory/packs'}
      ]
    },
    {
      label: 'Marketing', icon: 'redeem', items: [
        {label: 'Customers', link: '/rms/marketing/customers'},
        {label: 'Customer Groups', link: '/rms/marketing/customer-groups'},
        {label: 'Loyalty', link: '/rms/marketing/loyalty'},
        {label: 'Exclusions', link: '/rms/marketing/exclusions'},
        {label: 'Promotions', link: '/rms/marketing/promotions'}
      ]
    },
    {
      label: 'Access', icon: 'signal_cellular_alt', items: [
        {label: 'Employees', link: '/rms/access/employees'},
        {label: 'Positions', link: '/rms/access/positions'}
      ]
    }
  ];

  constructor(private router: Router) {
  }

  onBackClick(): void {
    this.router.navigate(['/']);
  }
}



import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent {

  public config = {
    canDeleteAccount: false,
    onSignOut: () => this.router.navigate(['login']),
    links: [
      {icon: 'home', text: 'Home'},
      {icon: 'store', text: 'Restaurant Management System'},
      {icon: 'shopping_cart', text: 'Point Of Sale'},
      {icon: 'dvr', text: 'Kitchen Display System'}
    ]
  };

  constructor(private router: Router) {
  }
}

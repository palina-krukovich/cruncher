import {Component} from '@angular/core';
import {AuthProvider} from 'ngx-auth-firebaseui';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  public config = {
    providers: [AuthProvider.Google],
    messageOnAuthSuccess: 'Welcome to Cruncher!',
    registrationEnabled: false,
    logoUrl: 'assets/images/pineapple_1_128.png',
    onSuccess: () => this.router.navigate(['home'])
  };

  constructor(private router: Router) {
  }
}

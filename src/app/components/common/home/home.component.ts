import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private router: Router) {
  }

  public modules = [
    {
      shortName: 'RMS',
      fullName: 'Restaurant Management System',
      smImgSrc: 'assets/images/pineapple_2_64.png',
      lgImgSrc: 'assets/images/pineapple_2_512.png',
      handle: () => this.router.navigate(['rms/menu/ingredients'])
    },
    {
      shortName: 'POS',
      fullName: 'Point Of Sale',
      smImgSrc: 'assets/images/pineapple_4_64.png',
      lgImgSrc: 'assets/images/pineapple_4_512.png',
      handle: () => this.router.navigate(['pos/board'])
    },
    {
      shortName: 'KDS',
      fullName: 'Kitchen Display System',
      smImgSrc: 'assets/images/pineapple_7_64.png',
      lgImgSrc: 'assets/images/pineapple_7_512.png',
      handle: () => this.router.navigate(['home'])
    }
  ];
}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-pos-nav',
  templateUrl: './pos-nav.component.html'
})
export class PosNavComponent implements OnInit {


  constructor(private router: Router,
              private route: ActivatedRoute) {
  }


  onBackClick(): void {
    const path = this.route.snapshot.routeConfig?.path || '';
    const pathToNavigate = path === 'pos/board'
      ? '/'
      : path.startsWith('pos/order')
        ? '/pos/board'
        : path.substring(0, path.lastIndexOf('/'));
    this.router.navigate([pathToNavigate]);
  }

  ngOnInit(): void {
  }

}

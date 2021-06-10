import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HallApiService} from '../../../api/hall-api.service';
import {Hall} from '../../../model/hall';

@Component({
  selector: 'app-pos-nav',
  templateUrl: './pos-nav.component.html',
  styleUrls: ['./pos-nav.component.scss']
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

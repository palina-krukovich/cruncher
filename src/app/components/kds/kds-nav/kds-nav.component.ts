import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-kds-nav',
  templateUrl: './kds-nav.component.html',
  styleUrls: ['./kds-nav.component.scss']
})
export class KdsNavComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onBackClick(): void {
    const path = this.route.snapshot.routeConfig?.path || '';
    const pathToNavigate = path === 'kds/board' ? '/' : '/kds/board';
    this.router.navigate([pathToNavigate]);
  }

}

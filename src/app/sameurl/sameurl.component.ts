import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';

@Component({
  selector: 'app-sameurl',
  templateUrl: './sameurl.component.html',
  styleUrls: ['./sameurl.component.scss']
})
export class SameurlComponent implements OnInit {
  sub: any;
  CatName: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.CatName = params['CatName'] || '0';
      });

    console.log('Hahahahahahaha Same URLllll');

    this.router.navigate(['/category-detail'], {queryParams: {CatName: this.CatName}})
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'perfy-suites-item',
  templateUrl: './suites-item.component.html',
  styleUrls: ['./suites-item.component.scss']
})
export class SuitesItemComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
    })
  }


}

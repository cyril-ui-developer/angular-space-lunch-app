import { Component, OnInit } from '@angular/core';

import { LunchesService } from '../lunches.service';
import { ILaunch } from '../launch';
import { launchColumns } from '../../constants/launch-columns.constant';
import { pagination } from '../../constants/pagination.constant';
import { order } from '../../constants/order.constant';



@Component({
  selector: 'app-lunches',
  templateUrl: './launches.component.html',
  styleUrls: ['./launches.component.scss']
})
export class LaunchesComponent implements OnInit {

  lunches: ILaunch[];
  columnTitles: string[] = launchColumns.columnTitles;
  columns: string[] = launchColumns.columns;
  currentPage: number = pagination.currentPage;
  activeOrder: string = order.ascending;
  maxSize: number = pagination.maxSize;
  pageSize: number  = pagination.pageSize;
  rotate: boolean = pagination.rotate;
  boundaryLinks: boolean = pagination.boundaryLinks;
  asc: string = order.ascending;
  desc: string = order.descending;

  constructor(private lunchesService: LunchesService) { }

  loadLaunches(limit: number, offset: number, order: string) {
    this.lunchesService
      .getAllLunches(limit, offset, order)
      .subscribe(data => (this.lunches = data));
  }

  ngOnInit() {
    this.loadLaunches(pagination.limit, pagination.offset, this.activeOrder);
  }

  orderLaunches( order: string ) {
    this.activeOrder = order;
    this.currentPage = 1;
    // the default limit and offset are used for order action
    this.loadLaunches(pagination.limit, pagination.offset, order);
  }

  pageChange() {
    // the default order is used for pagination action
    this.loadLaunches(pagination.limit, (this.currentPage - 1) * pagination.limit, this.activeOrder);
  }

  onLaunch(launch: ILaunch) {
    if (launch.presskit === undefined || launch.presskit === null) {
      console.log('Property presskit value is undefined or null!');
      event.preventDefault();
      return;
    }
    if (launch.presskit !== undefined || launch.presskit !== null) {
      window.open(launch.presskit, '_blank');
      return;
    }
  }
}

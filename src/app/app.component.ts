import { Component , OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { NgClass } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns = ['long', 'price', 'mktcap', 'perc'];
  dataSource: MatTableDataSource<FrontData>;

  coins: any;
  messages: object = {
    emptyMessage: 'Fetching Data...',
      totalMessage: 'total'
  }

  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  private apiUrl: string = 'http://coincap.io/front'
  constructor(private http: HttpClient) {
  }

  getFront() {
    this.http.get(this.apiUrl)
      .subscribe(data => {
        this.coins = data;
        setTimeout(() => { this.loadingIndicator = false; }, 1300)
        this.dataSource = new MatTableDataSource(this.coins);
      });

  }

  ngOnInit() {
    this.getFront();
  }
}

export interface FrontData {
  long: string,
  price: number,
  perc: number,
  mktcap: number
}

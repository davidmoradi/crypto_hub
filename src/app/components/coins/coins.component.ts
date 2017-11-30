import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { NgClass, CurrencyPipe, LowerCasePipe  } from '@angular/common';
import { CoincapService } from '../../services/coincap.service'

@Component({
  selector: 'coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CoinsComponent implements OnInit, AfterViewInit {
  displayedColumns = ['long', 'price', 'perc', 'mktcap'];
  dataSource: MatTableDataSource<FrontData>;
  liveUpdateSelected: boolean = false
  subscription: any;

  coins: any;
  messages: object = {
    emptyMessage: 'Fetching Data...',
      totalMessage: 'total'
  }

  loadingIndicator: boolean = true

  private apiUrl: string = 'https://coincap.io/front'

  @Output() loadingIndicatorEvent = new EventEmitter<string>();

  constructor(
    private http: HttpClient,
    private coincap: CoincapService,
  ) {}

  ngOnInit() {
    this.getFront({firstCall: true});

    // update front table data every 30 seconds.
    setInterval(() => {
      this.getFront({firstCall: false});
    }, 30000);
  }

  ngAfterViewInit() {
    this.showLoadingIndicator(true)
  }

  startLiveUpdate() {
    this.subscription = this.coincap.startSocket().subscribe(data => {
      const selectedRow = document.querySelector("#"+data.coin)
      this.addClass(selectedRow, 'coin_pump')
      //bitcoin = this.coins.filter(coin => coin.short == "BTC");
      setTimeout(() => { this.removeClass(selectedRow, 'coin_pump') }, 100)

    })
  }

  stopLiveUpdate() {
    // unsubscribe from Observable
    this.subscription.unsubscribe()
    // stop listening to websocket
    this.coincap.stopSocket()
  }

  liveUpdateToggle(event) {

    if (event.checked == true) {
      this.startLiveUpdate()
    } else {
      this.stopLiveUpdate()
    }
  }

  getFront(options) {
    this.http.get(this.apiUrl)
      .subscribe(data => {
        this.coins = data;
        console.log(this.coins)
        this.dataSource = new MatTableDataSource(this.coins);
        if (options.firstCall == true) {
          setTimeout(() => { this.showLoadingIndicator(false) }, 1300)
        }
      });
  }

  hasClass(el, className) {
    if (el.classList)
      return el.classList.contains(className)
    else
      return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
  }

  addClass(el, className) {
    if (el.classList)
      el.classList.add(className)
    else if (!this.hasClass(el, className)) el.className += " " + className
  }

  removeClass(el, className) {
    if (el.classList)
      el.classList.remove(className)
    else if (this.hasClass(el, className)) {
      var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
      el.className=el.className.replace(reg, ' ')
    }
  }

  showLoadingIndicator(show) {
    this.loadingIndicator = show
    this.loadingIndicatorEvent.emit(show)
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim()
    filterValue = filterValue.toLowerCase()
    this.dataSource.filter = filterValue
  }

   trimWhiteSpace(message) {
    return message.replace(/\s/g, '');
  }

}

export interface FrontData {
  long: string,
  price: number,
  perc: number,
  mktcap: number
}

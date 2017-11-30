import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CoincapService } from '../../services/coincap.service'
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CoinComponent implements OnInit {

  private apiUrl: string = 'https://coincap.io/page/'
  coin: any
  loadingIndicator = true

  constructor(
    private route: ActivatedRoute,
    private coincap: CoincapService,
    private location: Location,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getCoin()
  }

  getCoin() {
    // debugger
    const name = this.route.snapshot.paramMap.get('name')
    this.http.get(this.apiUrl + name)
      .subscribe(data => {
        this.coin = data;
        console.log(this.coin)
        this.loadingIndicator = false
      });
  }

   trimWhiteSpace(message) {
    return message.replace(/\s/g, '');
  }

}

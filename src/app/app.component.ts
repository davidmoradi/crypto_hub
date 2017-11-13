import { Component , OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  rows = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  // columns = [
  //   { prop: 'Name' },
  //   { name: 'Price' },
  //   { name: 'Short' }
  // ];
  private frontResult = {};
  private apiUrl = 'http://coincap.io/front'
  constructor(private http: HttpClient) {
    this.fetch((data) => {
      this.rows = data;
      setTimeout(() => { this.loadingIndicator = false; }, 1500);
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    // req.open('GET', this.apiUrl);
    req.open('GET', 'assets/sample_data/front.json');

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  // getFront() {
  //   // return this.http.get(this.apiUrl)
  //   //   .map((res: HttpResponse) => res.json())
  //   //   .subscribe(data => {
  //   //     console.log(data)
  //   //   })
  //   this.http.get(this.apiUrl)
  //     .subscribe(data => {
  //       // Read the result field from the JSON response.
  //       this.frontResult = data
  //     });
  // }
  //
  ngOnInit() {
    console.log('component initiliazed')
  }
}

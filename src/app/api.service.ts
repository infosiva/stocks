import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';  // RxJS 6 syntax
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}
  public getCompanyStocks(): Observable<any> {
    let company_Response = this.http.get(environment.Companies_APIURL);
    let stock_Response = this.http.get(environment.Companies_Stock_APIURL);
    return forkJoin([company_Response, stock_Response]);
  }
}

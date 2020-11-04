import { Component } from '@angular/core';
import { ApiService } from './api.service';

export interface CompanyStockMarket {
  id: number;
  name: string;
  symbol: string;
  market: string;
  stockValue: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  
})

export class AppComponent {
  title = 'Stockprice';
  tableColumns = ['name', 'symbol', 'market', 'stockValue', 'dateTime'];
  tableData = null ;
  constructor(private apiService: ApiService) {
    this.showStocks();
  }
  showStocks() {
    this.apiService.getCompanyStocks()
      .subscribe(res => {
        this.tableData = this.mapStockModel(res[0], res[1]);
      });
  }
  
  mapStockModel(companiesResponse: any, companiesStockResponse: any) {
    const model: CompanyStockMarket[] = [];
    companiesResponse.companies.map(response => {
      const stock  = companiesStockResponse.stockPrices.filter(item => item.companyId === response.id)
      const latest = stock && stock.reduce((prev, next) => prev.time > next.time ? prev : next, 0);
      const stockModel = {...response, stockValue: latest.price, dateTime: latest.time ? new Date(latest.time).toUTCString() : ''}
      model.push(stockModel);
    })
    return model;
  }
}

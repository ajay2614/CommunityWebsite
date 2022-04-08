import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  url = "http://localhost:8100";

  constructor(private http : HttpClient, private loginService : LoginService) { }

  getTotalProducts() : any{
    return this.http.get(`${this.url}/productStats`);
  }
  getTotalUsers() : any {
    return this.http.get(`${this.url}/userStats`);
  }
  getTotalReviews() : any {
    return this.http.get(`${this.url}/productDetailsStats`);
  }
}

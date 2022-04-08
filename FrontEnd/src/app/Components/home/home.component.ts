import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatsService } from 'src/app/Services/stats/stats.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,private http:HttpClient , private statsService : StatsService) { }

  totalProducts : String;
  totalUsers : String;
  totalProductReviews : String;

  ngOnInit(): void {
    this.statsService.getTotalProducts().subscribe((result:any)=>{
      this.totalProducts = result.product;
    })
    this.statsService.getTotalUsers().subscribe((result:any)=>{
      this.totalUsers = result.users;
    })
    this.statsService.getTotalReviews().subscribe((result:any)=>{
      this.totalProductReviews = result.productDetails;
    })
  }

  login() : void{
    this.router.navigate(['login/']);
  }
  register() : void{
    this.router.navigate(['register/']);
  }

}

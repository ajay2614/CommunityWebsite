import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login/login.service';
import { ProductService } from 'src/app/Services/product/product.service';

@Component({
  selector: 'app-getreviews',
  templateUrl: './getreviews.component.html',
  styleUrls: ['./getreviews.component.less']
})
export class GetreviewsComponent implements OnInit {

  constructor(private router : Router , private route : ActivatedRoute , private productService : ProductService,
    private loginService : LoginService
    ) { }

  productId : any
  productDetails : any
  productRatings : any
  reviewsTotal : any
  result : boolean;
  error : boolean;
  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.productService.getAcceptedProductReviews(this.productId).subscribe({
      next: ((value : any ) => {
        console.log(value);
        this.result = true;
        this.error = false;
        this.productDetails = value;
    }),
      error : () => {
        this.result = false;
        this.error = true;
      }
    })

    this.productService.getProductRatings(this.productId).subscribe({
      next: ((value : any ) => {
        console.log(value);
        this.productRatings = value;
    }),
      error : () => {
      this.result = false;
      this.error = true;
    }
    })

    this.productService.getReviewsCount(this.productId).subscribe({
      next: ((value : any ) => {
        console.log(value);
        this.reviewsTotal = value;
    }),
      error : () => {alert('Please Try Again')
      this.result = false;
      this.error = true;
    }
    })
  }

  back() {
    let username = this.route.snapshot.paramMap.get('username');
    let productcodes = this.route.snapshot.paramMap.get('productcodes');

    this.router.navigate(['products/',username,productcodes]);
  }
  logout(){
    alert('Logging Out');
    this.loginService.logout();
    this.router.navigate(['home/'])
  }

  dashboard(){
    let username = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['dashboard',username]);    
  }

}

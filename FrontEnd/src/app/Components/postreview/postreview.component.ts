import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login/login.service';
import { ProductService } from 'src/app/Services/product/product.service';

@Component({
  selector: 'app-postreview',
  templateUrl: './postreview.component.html',
  styleUrls: ['./postreview.component.less']
})
export class PostreviewComponent implements OnInit {

  constructor(private router : Router , private route : ActivatedRoute , private productService : ProductService,
    private loginService : LoginService) { }

  username : any;
  productcode : any;
  heading : any;
  review : any;
  ratings : any;

  details = {
    userid : '',
    productid : '',
    heading : '',
    review : '',
    approval : 'pending',
    ratings : ''
  } 
  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('id');
    this.productcode = this.route.snapshot.paramMap.get('productcode');
  }

  postReview() {

    if(this.heading === undefined || this.review === undefined) {
      alert("Please Enter All The Fields");
      return;
    }
    if( this.ratings === undefined) {
      alert("Please Move The Slider To Rate");
      return;
    }
    if(this.heading.length < 3 || this.heading.length > 15) {
      alert("Heading Cannot be less than 3 characters and cannot be greater than 10 characters");
      return;
    }

    if(this.review.length < 5 || this.review.length > 20) {
      alert("Review Cannot be less than 5 characters and cannot be greater than 20 characters");
      return;
    }

    this.details.userid = this.username;
    this.details.productid = this.productcode;
    this.details.heading = this.heading;
    this.details.review = this.review;
    this.details.ratings = this.ratings;
    console.log(this.details);


    this.productService.postReview(this.details).subscribe({
      next: ((value : any ) => {console.log(value)
      alert("Review Posted Successfully");
      let username = this.route.snapshot.paramMap.get('id');
      let productcodes = this.route.snapshot.paramMap.get('productcodes');
      this.router.navigate(['products',username,productcodes]);  
      }),
        error : () => {alert('Please Try Again')}
      }
    )
  }


  back() {
    let username = this.route.snapshot.paramMap.get('id');
    let productcodes = this.route.snapshot.paramMap.get('productcodes');
    this.router.navigate(['products',username,productcodes]);    
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

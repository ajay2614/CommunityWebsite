import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login/login.service';
import { ProductService } from 'src/app/Services/product/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {

  productDetails : any;
  result : boolean;
  error:boolean;
  
  constructor(private loginService : LoginService , private router : Router, private route : ActivatedRoute,
    private productService :ProductService
    ) { }

  ngOnInit(): void {
    this.productService.getAllProductDetails().subscribe({
      next : ((value : any ) =>{
        console.log(value);
        this.result = true;
        this.error = false;
        this.productDetails = value; 
      }),
      error : () => {this.result=false;
        this.error=true;
    } 
    })
  }

  approveReview(val : any) {
    this.productService.approveProductReview(val).subscribe({
      next : (() =>{
        this.productService.getAllProductDetails().subscribe({
          next : ((value : any ) =>{
            console.log(value);
            this.productDetails = value; 
          })
        })
      })
    });
  }
  rejectReview(val : any) {
    console.log(val);
    this.productService.rejectProductReview(val).subscribe({
      next : (() =>{
        this.productService.getAllProductDetails().subscribe({
          next : ((value : any ) =>{
            console.log(value);
            this.productDetails = value; 
          })
        })
      })
    })
  }

  logout(){
    alert('Logging Out');
    this.loginService.logout();
    this.router.navigate(['home/'])
  }
}

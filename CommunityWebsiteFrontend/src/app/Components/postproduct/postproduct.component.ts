import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login/login.service';
import { ProductService } from 'src/app/Services/product/product.service';

@Component({
  selector: 'app-postproduct',
  templateUrl: './postproduct.component.html',
  styleUrls: ['./postproduct.component.less']
})
export class PostproductComponent implements OnInit {

  constructor(private productService : ProductService, private route : ActivatedRoute , private router : Router,
    private loginService : LoginService) { }

  product = {
    productCode : '',
    productName : '',
    brand : '',
    ratings : 0,
    totalRatings : 0
  }
  productcode : any;
  productname : any;
  productbrand : any;
  ngOnInit(): void {
  }

  postForReview(){

    if(this.productbrand === undefined || this.productcode === undefined || this.productname === undefined) {
      alert("Please enter all the fields");
      return;
    }
    this.productService.checkIfProductExists(this.productcode).subscribe(
      {
        next: ((value : any ) => {
          if(value.exists === 'yes') {
            alert("Product Id already Exists");
            let username = this.route.snapshot.paramMap.get('id');
            let productcodes = this.route.snapshot.paramMap.get('code');
            this.router.navigate(['getreviews',this.productcode,username,productcodes]);
          } else{
            this.product.productCode = this.productcode;
            this.product.brand = this.productbrand;
            this.product.productName = this.productname;
            this.productService.saveProduct(this.product).subscribe(
              {
                next: ((value : any ) => {
                  console.log(value);
                  alert("Product Successfully Posted");
                  let id = this.route.snapshot.paramMap.get('id');
                  let code = this.route.snapshot.paramMap.get('code');

                  this.router.navigate(['products',id,code]);
                }),
                error : () => {alert('Please Try Again')}
              }
             )
          }
        }),
        error : () => {alert('Please Try Again')}
      }
     )
  }
  back() {
    let id = this.route.snapshot.paramMap.get('id');
    let code = this.route.snapshot.paramMap.get('code');
    this.router.navigate(['products',id,code]);    
  }
  logout(){
    alert('Logging Out');
    this.loginService.logout();
    this.router.navigate(['home/'])
  }
}

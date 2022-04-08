import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/Services/product/product.service';
import { MatSliderModule } from '@angular/material/slider'; 
import { LoginService } from 'src/app/Services/login/login.service';
import { ConstantPool } from '@angular/compiler';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less']
})
export class ProductsComponent implements OnInit {

  productCode : String;
  productBrand : String;
  productName : String;
  rangeValue : any | undefined;
  products : any;
  productIds : any;
  username : any;
  result : boolean = true;
  error : boolean = false;
  opened = false;
  dropdown = false;
  constructor(private productService : ProductService , private route : ActivatedRoute , private router : Router, private loginService : LoginService) { }

  ngOnInit(): void {
  this.productIds = this.route.snapshot.paramMap.get('productcodes');
  this.username = this.route.snapshot.paramMap.get('id');
  if(this.productIds === '') {
    
    this.result = false;
    this.error = true;
  }
  else{
  this.productService.getProductByCodes(this.productIds).subscribe({
    next: ((value : any ) => {console.log(value)
    this.products = value;
    })
    })
  }
}
  

  //products : any = this.productService.getProducts();
  productCodeStr : String = this.productService.getProductArray();



  filterbycode(){
    this.productService.filterByCode(this.productIds,this.productCode).subscribe({
      next: ((value : any ) => {console.log(value)
        let text = '';
        value.forEach(myFunction);

        function myFunction(item : any) {
        text += item.productCode+",";
        }
        text = text.slice(0, -1);
        console.log("text" , text);
        this.productService.getProductByCodes(text).subscribe({
          next: ((value : any ) => {console.log(value)
          this.products = value;
          this.router.navigate(['products/',this.username,text]);    
          }
          )
          }       
        )}
      )
      } 
    )
  }
  filterbybrand(){
    this.productService.filterByBrand(this.productIds,this.productBrand).subscribe({
      next: ((value : any ) => {console.log(value)
        let text = '';
        value.forEach(myFunction);

        function myFunction(item : any) {
        text += item.productCode+",";
        }
        text = text.slice(0, -1);
        console.log("text" , text);
        this.productService.getProductByCodes(text).subscribe({
          next: ((value : any ) => {console.log(value)
          this.products = value;
          this.router.navigate(['products/',this.username,text]);    
        }
          )
          }       
        )}
      )
      } 
    )
  }
  filterbyname(){
    this.productService.filterByName(this.productIds,this.productName).subscribe({
      next: ((value : any ) => {console.log(value)
        let text = '';
        value.forEach(myFunction);

        function myFunction(item : any) {
        text += item.productCode+",";
        }
        text = text.slice(0, -1);
        console.log("text" , text);
        this.productService.getProductByCodes(text).subscribe({
          next: ((value : any ) => {console.log(value)
          this.products = value;
          this.router.navigate(['products/',this.username,text]);    
        }
          )
          }       
        )}
      )
      } 
    )
  }

  postReview(val : any){
    this.productService.checkIfReviewExists(this.username,val).subscribe({
      next: ((value : any ) => {
        console.log(value);
        if(value.exists === 'yes') {
          alert("You Cannot post a review twice");
        }else{
          let ids = this.route.snapshot.paramMap.get('productcodes');
          this.router.navigate(['postreview/',this.username,val,ids]);
        }
    }),
      error : () => {alert('Please Try Again')}
    })
  }

  getAllReviews(val : any) {
    console.log(val);

    let username = this.route.snapshot.paramMap.get('id');
    let productcodes = this.route.snapshot.paramMap.get('productcodes');
    this.router.navigate(['getreviews/',val,username,productcodes]);
  }
  postProduct(){
    let code = this.route.snapshot.paramMap.get('productcodes');
    console.log(code);
    this.router.navigate(['postproduct/',this.username,code]);
  }

  logout(){
    alert('Logging Out');
    this.loginService.logout();
    this.router.navigate(['home/'])
  }
  dropdown1(){
    if(this.dropdown===false){
      this.dropdown=true;
    }
    else{
      this.dropdown=false;
    }
  }
  dashboard(){
    let username = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['dashboard',username]);    
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login/login.service';
import { RegisterService } from 'src/app/Services/register/register.service';
import { HttpHeaders } from '@angular/common/http';
import { StatsService } from 'src/app/Services/stats/stats.service';
import { ProductService } from 'src/app/Services/product/product.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  constructor(private loginService : LoginService , private router: Router, private registerService : RegisterService, private http :HttpClient, private statsService : StatsService, 
    private productService : ProductService , private route : ActivatedRoute) { }

  totalProducts : String;
  totalUsers : String;
  totalProductReviews : String;

  product = {
    productCode : undefined,
    brand : undefined,
    productName : undefined
  }

  productCode = 0;
  productName = "empty";
  brand = "empty"; 

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

  hello() {

    // let token = "Bearer "+this.loginService.getToken();
    // console.log("tok" , token); 
    // const headers =  new HttpHeaders().set("Authorization", token);
    // headers.append('Access-Control-Allow-Origin','*');
    // this.http.get(`http://localhost:8100/hello`,{headers : headers}).subscribe((result)=>{
    // console.log(result);
    // })
    this.registerService.we().subscribe((result : any)=>{
      console.log(result);
    })
    // this.registerService.test().subscribe(
    //   {
    //     next: ((value : any ) => {console.log(value)
    //       alert(value);
    //     }),
    //     error : () => {alert('Please Try Again')}
    //   }
    //  )
  }

  // we(){
  //   let token = "Bearer "+this.loginService.getToken();
  //   console.log("tok" , token); 
  //   const headers =  new HttpHeaders().set("Authorization", token);
  //   //headers.append('Access-Control-Allow-Origin','*');
  //   this.http.get(`http://localhost:8100/approvedProductDetailsByProductId/1`,{headers : headers}).subscribe((result)=>{
  //   console.log(result);
  //   })
  // }
  logout(){
    alert('Logging Out');
    this.loginService.logout();
    this.router.navigate(['home/'])
  }

  getProducts(){
    
    if(this.product.productCode == undefined && this.product.productName == undefined && this.product.brand == undefined) {
      alert("Please Enter Atleast one value");
      return; 
    }
    else if(this.product.productCode === undefined && this.product.productName != undefined && this.product.brand != undefined) {
      this.productService.searchProducts(0,this.product.brand,this.product.productName).subscribe(
        {
          next: ((value : any ) => {console.log(value)
          this.productService.setProducts(value);
          let text = '';
          value.forEach(myFunction);

          function myFunction(item : any) {
          text += item.productCode+",";
          }
          text = text.slice(0, -1);
          console.log("text" , text);
          this.productService.setProductArray(text);
          let username = this.route.snapshot.paramMap.get('id');
          this.router.navigate(['products/',username,text]);
          }),
          error : () => {alert('Please Try Again')}
        }
       )
    }
    else if(this.product.productCode === undefined && this.product.productName === undefined && this.product.brand != undefined) {
      this.productService.searchProducts(0,this.product.brand,"empty").subscribe(
        {
          next: ((value : any ) => {console.log(value)
          this.productService.setProducts(value);
          let text = '';
          value.forEach(myFunction);

          function myFunction(item : any) {
          text += item.productCode+",";
          }
          text = text.slice(0, -1);
          console.log("text" , text);
          this.productService.setProductArray(text);
          let username = this.route.snapshot.paramMap.get('id');
          this.router.navigate(['products/',username,text]);
        }),
          error : () => {alert('Please Try Again')}
        }
       )
    }else if(this.product.productCode === undefined && this.product.productName != undefined && this.product.brand === undefined) {
      this.productService.searchProducts(0,"empty",this.product.productName).subscribe(
        {
          next: ((value : any ) => {console.log(value)
          this.productService.setProducts(value);
          let text = '';
          value.forEach(myFunction);

          function myFunction(item : any) {
          text += item.productCode+",";
          }
          text = text.slice(0, -1);
          console.log("text" , text);
          this.productService.setProductArray(text);
          let username = this.route.snapshot.paramMap.get('id');
          this.router.navigate(['products/',username,text]);
          }),
          error : () => {alert('Please Try Again')}
        }
       )
    }
    else {
      this.productService.searchProducts(this.product.productCode,this.product.brand,this.product.productName).subscribe(
        {
          next: ((value : any ) => {console.log(value)
          this.productService.setProducts(value);
          let text = '';
          value.forEach(myFunction);
          function myFunction(item : any) {
          text += item.productCode + ",";
          }
          text = text.slice(0, -1);
          console.log("text" , text);
          this.productService.setProductArray(text);
          let username = this.route.snapshot.paramMap.get('id');
          this.router.navigate(['products/',username,text]);
          }),
          error : () => {alert('Please Try Again')}
        }
       )
    }
  }
}

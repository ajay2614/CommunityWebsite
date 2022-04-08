import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpParamsOptions } from '@angular/common/http';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url = "http://localhost:8100";

  constructor(private http : HttpClient, private loginService : LoginService) { }

  //   headers= new HttpHeaders()
  // .set('content-type', 'application/json')
  // .set('Access-Control-Allow-Origin', '*');


  registerUser(user : any){
    return this.http.post(`${this.url}/registerUser`,user);
  }

  checkUser(user : any) : any {
    return this.http.post(`${this.url}/checkUser`,user);
  }
  test() : any{
    let token = "Bearer "+this.loginService.getToken();
    console.log("tok" , token); 
    const headers =  new HttpHeaders().set("Authorization", token);
    headers.append('Access-Control-Allow-Origin','*');
    return this.http.get(`${this.url}/hello`,{headers : headers});
  }

  we() : any{
    return this.http.get(`${this.url}/approvedProductDetailsByProductId/1`);
  }
}

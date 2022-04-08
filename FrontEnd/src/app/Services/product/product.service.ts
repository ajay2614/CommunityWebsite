import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = "http://localhost:8100"
  products : any;
  productCode : String;
  constructor(private http : HttpClient) { }

  searchProducts(code : any, brand : any , name : any) {
    return this.http.get(`${this.url}/getProducts/${code}/${brand}/${name}`);
  }

  filterByBrand(codeStr : String , brand : any) {
    return this.http.get(`${this.url}/filteredProductByProductBrand/${codeStr}/${brand}`);
  }

  filterByCode(codeStr : String , code : any) {
    return this.http.get(`${this.url}/filteredProductByProductCode/${codeStr}/${code}`);
  }
  filterByName(codeStr : String , name : any) {
    return this.http.get(`${this.url}/filteredProductByProductName/${codeStr}/${name}`);
  }
  updateRatings(ratings : any , productCode : any){
    return this.http.get(`${this.url}/updateRatings/${ratings}/${productCode}`);
  }

  getProductByCodes(productCodes : any) {
    return this.http.get(`${this.url}/getProductFromProductCodes/${productCodes}`);
  }

  postReview(productDetails: any) {
    return this.http.post(`${this.url}/postReview`,productDetails);
  }
  
  checkIfReviewExists(userid : any , productid : any) {
  return this.http.get(`${this.url}/checkIfReviewExists/${userid}/${productid}`);
  }
  setProducts(products : any) : void{
    this.products = products;
  }
  getProducts(){
    return this.products;
  }
  setProductArray(productCode : String){
    this.productCode = productCode;
  }
  getProductArray(){
    return this.productCode;
  }
  getAcceptedProductReviews(productCode : any) {
    return this.http.get(`${this.url}/approvedProductDetailsByProductId/${productCode}`);
  }
  checkIfProductExists(productCode : any) {
    return this.http.get(`${this.url}/checkIfProductExists/${productCode}`);    
  }

  saveProduct(product : any) {
    return this.http.post(`${this.url}/saveProduct`,product);     
  }

  getAllProductDetails() {
    return this.http.get(`${this.url}/getAllProductDetails`);    
  }
  approveProductReview(id : any) {
    return this.http.put(`${this.url}/approveProductReview`,id);
  }
  rejectProductReview(id : any) {
    return this.http.put(`${this.url}/rejectProductReview`,id);
  }
  getProductRatings(id : any) {
    return this.http.get(`${this.url}/getRatings/${id}`);
  }
  getReviewsCount(id : any) {
    return this.http.get(`${this.url}/getReviewsCount/${id}`); 
  }
}

package com.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.model.ProductDetails;
import com.service.ProductDetailsService;

@RestController
@CrossOrigin
public class ProductDetailsController {
	
	
	@Autowired
	private ProductDetailsService productDetailsService;

	@GetMapping("/approvedProductDetailsByProductId/{productId}")
	public List<ProductDetails> getApprovedProductDetailsByProductId(@PathVariable String productId) {
		return productDetailsService.getProductDetailsByProductIdApproved(productId);
	}
	
	@GetMapping("/rejectedProductDetailsByProductId/{productId}")
	public List<ProductDetails> getRejectedProductDetailsByProductId(@PathVariable String productId) {
		return productDetailsService.getProductDetailsByProductIdRejected(productId);
	}
	
	@GetMapping("/allProductDetailsByProductId/{productId}")
	public List<ProductDetails> getAllProductDetailsByProductId(@PathVariable String productId) {
		return productDetailsService.getAllProductDetailsByProductId(productId);
	}
	
	@GetMapping("/productDetailsByUserId/{userId}")
	public List<ProductDetails> getProductDetailsByUserId(@PathVariable String userId) {
		return productDetailsService.getProductDetailsByUserId(userId);
	}
	
	@GetMapping("/checkIfReviewExists/{userid}/{productid}")
	public Map<String , String> checkIfReviewExists(@PathVariable String userid, @PathVariable int productid) {
		String str = productDetailsService.checkIfReviewExists(userid, productid);
		
		HashMap<String,String> map = new HashMap<>();
		map.put("exists", str);
		return map;
	}
	
	@GetMapping("/getAllProductDetails") 
	public List<ProductDetails> getAllProductDetails() {
		return productDetailsService.getAllProductDetails();
	}
	@PutMapping("/approveProductReview")
	public void aproveProductReview(@RequestBody int id) {
		productDetailsService.approveProductReview(id);
	}
	
	@PutMapping("/rejectProductReview")
	public void rejectProductReview(@RequestBody int id) {
		productDetailsService.rejectProductReview(id);
	}
	
	@PostMapping("/postReview")
	public ProductDetails postReview(@RequestBody ProductDetails productDetails) {
		return productDetailsService.postReview(productDetails);
	}
	
	@GetMapping("/getRatings/{code}") 
	public int getProductRatings(@PathVariable int code) {
		return productDetailsService.getRatings(code);
	}
	
	@GetMapping("/getReviewsCount/{code}") 
	public int getReviewsCount(@PathVariable int code) {
		return productDetailsService.getTotalReviewsByProductId(code);
	}
}

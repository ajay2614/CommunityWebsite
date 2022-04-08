package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.ProductDetailsDao;
import com.model.ProductDetails;

@Service
public class ProductDetailsService {

	@Autowired
	private ProductDetailsDao productDetailsDao;
	
	public ProductDetails postReview(ProductDetails productDetails) {
		return productDetailsDao.save(productDetails);
	}
	public int getTotalProductDetails() {
		return productDetailsDao.findTotalProductDetails();
	}
	
	public List<ProductDetails> getAllProductDetails() {
		return productDetailsDao.findAllProductDetails();
	}

	public List<ProductDetails> getProductDetailsByProductIdApproved(String productId) {
		String approval = "yes";
		return productDetailsDao.findProductDetailsByProductid(approval, productId);
	}
	public List<ProductDetails> getProductDetailsByProductIdRejected(String productId) {
		String approval = "no";
		return productDetailsDao.findProductDetailsByProductid(approval, productId);
	}
	
	public List<ProductDetails> getAllProductDetailsByProductId(String productId) {
		return productDetailsDao.findAllProductDetailsByProductid(productId);
	}
	
	public List<ProductDetails> getProductDetailsByUserId(String userId) {
		return productDetailsDao.findByUserid(userId);
	}
	
	public void approveProductReview(int id) {
		String approval = "yes";
		productDetailsDao.approveOrRejectProductReview(approval, id);
	}
	public void rejectProductReview(int id) {
		String approval = "no";
		productDetailsDao.approveOrRejectProductReview(approval, id);
	}
	
	public String checkIfReviewExists(String userid , int productid) {
		ProductDetails productDetails = productDetailsDao.checkIfReviewExists(userid, productid);
		if(productDetails != null) {
			return "yes";
		}
		return "no";
	}
	
	public int getRatings(int productid) {
		return productDetailsDao.getRatings(productid);
	}
	
	public int getTotalReviewsByProductId(int productid) {
		return productDetailsDao.getReviewCount(productid);
	}
}

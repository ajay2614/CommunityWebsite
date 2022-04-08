package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.ProductDao;
import com.dao.UserDao;
import com.model.Product;

@Service
public class ProductService {

	@Autowired
	private ProductDao productDao;
	
	public List<Product> getAllProducts() {
		return productDao.findAll();
	}
	
//	public int getRatings(int productCode){
//		return productDao.getRatingsByProductId(productCode);
//	}
//	
//	public int getTotalRatings(int productCode){
//		return productDao.getTotalRatingsByProductId(productCode);
//	}
	
	public Product postForReview(Product product) {
		return productDao.save(product);
	}
	
	public int getTotalProducts() {
		return productDao.findTotalProducts();
	}
	public List<Product> getProductByBrand(String brand) {
		return productDao.findByBrand(brand);
	}
	
//	public void updateRatings(int ratings , int productCode) {
//		productDao.setRatingsByProductId(ratings, productCode);
//	}
	
	public List<Product> getProductByProductName(String productName) {
		return productDao.findByProductName(productName);
	}
	
	public List<Product> getProductByProductCode(int productCode) {
		return productDao.findByProductCode(productCode);
	}
	
	public List<Product> getProductByBrandandProductName(String brand, String productName) {
		return productDao.productByProductBrandandName(brand, productName);
	}
	
	public List<Product> getProductByProductCodeandProductName(int productCode, String productName) {
		return productDao.productByProductCodeandName(productCode, productName);
	}

	public List<Product> getProductByBrandandProductCode(String brand, int productCode) {
		return productDao.productByProductBrandandCode(brand, productCode);
	}
	
	public List<Product> getProductByBrandandProductCodeandProductName(String brand, int productCode, String productName) {
		return productDao.productByProductBrandandCodeandName(brand, productCode, productName);
	}
	
	public List<Product> getFilteredProductByProductBrand(List<Integer> value1, String value2) {
		return productDao.findFilteredProductByProductBrand(value1, value2);
	}
	
	public List<Product> getFilteredProductByProductCode(List<Integer> value1, int value2) {
		return productDao.findFilteredProductByProductCode(value1, value2);
	}
	
	public List<Product> getFilteredProductByProductName(List<Integer> value1, String value2) {
		return productDao.findFilteredProductByProductName(value1, value2);
	}	
	
	public List<Product> getProductsFromCodes(List<Integer> codes) {
		return productDao.getProductsByProductId(codes);
	}
	
}

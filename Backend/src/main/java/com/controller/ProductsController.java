package com.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.model.Product;
import com.service.ProductService;

@RestController
@CrossOrigin
public class ProductsController {

	@Autowired
	private ProductService productService;
	
	@PostMapping("/producthiproduct")
	public void getProducts(@RequestBody Product product) {
		int code = product.getProductCode();
		String brand = product.getBrand();
		String name = product.getProductName();
		System.out.println(code + "prinsa" + brand + "" + name);
	}
	
	@GetMapping("/getProducts/{code}/{brand}/{name}")
	public List<Product> getProducts2(@PathVariable int code, @PathVariable String brand, @PathVariable String name) {

		if(code == 0 || brand.equals("empty") || name.equals("empty")) {
			if(code == 0 && (!brand.equals("empty")) && (!name.equals("empty")) ) {
				return productService.getProductByBrandandProductName(brand, name);
			} else if(code == 0 && brand.equals("empty") && (!name.equals("empty")) ) {
				return productService.getProductByProductName(name);
			} else if(code == 0 && (!brand.equals("empty")) && (name.equals("empty")) ) {
				return productService.getProductByBrand(brand);
			}	
		}
		return productService.getProductByProductCode(code);
	}
	
	@GetMapping("/checkIfProductExists/{code}")
	public Map<String, String> checkIfProductExists(@PathVariable int code) {
		List<Product> list = productService.getProductByProductCode(code);
		HashMap<String, String> map = new HashMap<>();
		if(list.isEmpty()) {
			map.put("exists", "no");
			return map;
		}
		map.put("exists", "yes");
		return map;
	}
	
	@PostMapping("/saveProduct")
	public Product saveProduct(@RequestBody Product product) {
		return productService.postForReview(product);
	}
	
	
	@GetMapping("/filteredProductByProductBrand/{value1}/{value2}")
	public List<Product> getFilteredProductByProductBrand(@PathVariable List<Integer> value1, @PathVariable String value2) {
		return productService.getFilteredProductByProductBrand(value1, value2);
	}
	
	@GetMapping("/filteredProductByProductCode/{value1}/{value2}")
	public List<Product> getFilteredProductByProductCode(@PathVariable List<Integer> value1, @PathVariable int value2) {
		return productService.getFilteredProductByProductCode(value1, value2);
	}
	
	@GetMapping("/filteredProductByProductName/{value1}/{value2}")
	public List<Product> getFilteredProductByProductName(@PathVariable List<Integer> value1, @PathVariable String value2) {
		return productService.getFilteredProductByProductName(value1, value2);
	}
	
	@GetMapping("/getProductFromProductCodes/{codes}") 
	public List<Product> getFilteredProductByProductName(@PathVariable List<Integer> codes) {		
		return productService.getProductsFromCodes(codes);
	}
}

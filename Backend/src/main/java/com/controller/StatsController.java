package com.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jackson.JsonObjectSerializer;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.service.ProductDetailsService;
import com.service.ProductService;
import com.service.UserService;

@RestController
@CrossOrigin
public class StatsController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private ProductDetailsService productDetailsService;
	
	@GetMapping("/userStats")
	public Map<String,Integer> totalUsers() {
		HashMap<String, Integer> map = new HashMap<>();
		map.put("users",userService.getTotalUsers());
		return map;
	}
	
	@GetMapping("/productStats")
	public Map<String,Integer> totalProducts() {
		HashMap<String, Integer> map = new HashMap<>();
		map.put("product", productService.getTotalProducts());
		return map;
	}
	
	@GetMapping("/productDetailsStats")
	public Map<String,Integer> totalProductDetails() {
		HashMap<String, Integer> map = new HashMap<>();
		map.put("productDetails" , productDetailsService.getTotalProductDetails());
		return map;
	}
}

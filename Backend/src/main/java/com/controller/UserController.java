package com.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.model.CustomUserDetails;
import com.model.JWTRequest;
import com.model.JWTResponse;
import com.model.Product;
import com.model.ProductDetails;
import com.model.User;
import com.service.ProductDetailsService;
import com.service.ProductService;
import com.service.UserService;
import com.util.JWTUtility;


@RestController
@CrossOrigin
public class UserController {

	@Autowired
	private JWTUtility jwtUtility;

	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private ProductDetailsService productDetailsService;
	
	@GetMapping("/findRol/{username}")
	public Map<String,String> getRol(@PathVariable String username) {
		HashMap<String,String> map = new HashMap<>();
		String str = userService.findRol(username);
		map.put("user", str);
		return map;
	}
	@PostMapping("/token")
    public ResponseEntity<?> generateToken(@RequestBody JWTRequest jwtRequest) throws Exception{
		try {
			this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(),jwtRequest.getPassword()));
		} catch(UsernameNotFoundException e) {
			e.printStackTrace();
		} catch(BadCredentialsException e) {
			throw new Exception("Bad Credentials");
		}
		
		UserDetails userDetails = this.userService.loadUserByUsername(jwtRequest.getUsername());
		String token = this.jwtUtility.generateToken(userDetails);
		
		return ResponseEntity.ok(new JWTResponse(token));
	}
	
	@PostMapping("/registerUser")
	public User registerUser(@RequestBody User user) {
		return userService.saveUser(user);
	}
	
	@PostMapping("/checkUser")
	public Map<String,Integer> checkUser(@RequestBody User user) {
		String username = user.getUsername();
		int user1 = this.userService.checkUser(username);
		HashMap<String,Integer> map = new HashMap<>();
		map.put("user",user1);
		return map;
	}
}

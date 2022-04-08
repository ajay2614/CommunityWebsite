package com.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.dao.UserDao;
import com.model.CustomUserDetails;
import com.model.User;

@Service
public class UserService implements UserDetailsService{

	@Autowired
	private UserDao userDao;
	
	@Override
	public CustomUserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
		User user = this.userDao.findByUsername(userName);
		
		System.out.println(new CustomUserDetails(user));
		if(user == null) {
			throw new UsernameNotFoundException("User Not Found");
		} else {
			return new CustomUserDetails(user);
		}
	}
	
	public User saveUser(User user) {
		return userDao.save(user);
	}
	
	public String findRol(String username) {
		return userDao.findRol(username);
	}
	
	public int getTotalUsers() {
		return userDao.findTotalUsers();
	}
	
	public int checkUser(String username) {
		User user = this.userDao.findByUsername(username);
		
		if(user == null) {
			return 0;
		}
		return 1;
	}
}

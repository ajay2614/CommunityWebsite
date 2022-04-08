package com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.model.User;

@Repository
public interface UserDao extends JpaRepository<User,Integer>{
	
	public User findByUsername(String username);
	
	@Query(value = "select count(*) from user", 
			nativeQuery = true)
	int findTotalUsers();
	
	@Query(value = "select rol from user where username =:v1", 
			nativeQuery = true)
	String findRol(@Param("v1") String value1);
}

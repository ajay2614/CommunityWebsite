package com.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class User {


	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	private String firstname;

	private String lastname;

	@Column(unique=true)
	private String username;

	private String password;
	
	private String rol;

	public String getFirstName() {
		return firstname;
	}

	public void setFirstName(String firstName) {
		this.firstname = firstName;
	}

	public String getLastName() {
		return lastname;
	}

	public void setLastName(String lastName) {
		this.lastname = lastName;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getRol() {
		return rol;
	}

	public void setRol(String rol) {
		this.rol = rol;
	}
	
	public User() {
		
	}
	
	public User(int id, String firstName, String lastName, String username, String password, String rol) {
		
		this.id = id;
		this.firstname = firstName;
		this.lastname = lastName;
		this.username = username;
		this.password = password;
		this.rol = rol;
	}
}
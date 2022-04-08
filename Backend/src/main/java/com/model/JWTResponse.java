package com.model;


public class JWTResponse {
	private String jwtToken;
	
	public JWTResponse(String token) {
		this.jwtToken = token;
	}
	public String getJwtToken() {
		return jwtToken;
	}
	public void setJwtToken(String jwtToken) {
		this.jwtToken = jwtToken;
	}	
}
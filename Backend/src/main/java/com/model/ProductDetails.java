package com.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ProductDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	private String userid;
	private int productid;
	private String review;
	private String heading;
	private String approval;
	private int ratings;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public int getProductid() {
		return productid;
	}
	public void setProductid(int productid) {
		this.productid = productid;
	}
	public String getReview() {
		return review;
	}
	public void setReview(String review) {
		this.review = review;
	}

	public String getHeading() {
		return heading;
	}
	public void setHeading(String heading) {
		this.heading = heading;
	}
	
	public ProductDetails() {
		
	}
	
	public ProductDetails(int id, String userid, int productid, String review, String heading, String approval,int ratings) {
		this.id = id;
		this.userid = userid;
		this.productid = productid;
		this.review = review;
		this.heading = heading;
		this.approval = approval;
		this.ratings = ratings;
	}
	
	public String getApproval() {
		return approval;
	}
	public void setApproval(String approval) {
		this.approval = approval;
	}
	public int getRatings() {
		return ratings;
	}
	public void setRatings(int ratings) {
		this.ratings = ratings;
	}
	
}

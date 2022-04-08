package com.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.model.ProductDetails;


public interface ProductDetailsDao extends JpaRepository<ProductDetails,Integer>{

	public List<ProductDetails> findByUserid(String userid);
	
	@Query(value = "select * from product_details", 
			nativeQuery = true)
	List<ProductDetails> findAllProductDetails();
	
	@Query(value = "select count(*) from product_details", 
			nativeQuery = true)
	int findTotalProductDetails();
	
	@Query(value = "select * from product_details where approval =:approval and productid =:productid", 
			nativeQuery = true)
	public List<ProductDetails> findProductDetailsByProductid(@Param("approval") String approval, @Param("productid") String productid);
	
	@Query(value = "select * from product_details where productid =:productid", 
			nativeQuery = true)
	public List<ProductDetails> findAllProductDetailsByProductid(@Param("productid") String productid);
	
	@Modifying
	@Transactional
	@Query
	(value = "update product_details set approval =:approval where id =:inputid", 
			nativeQuery = true)
	public void approveOrRejectProductReview(@Param("approval") String approval, @Param("inputid") int id);
	
	@Query
	(value = "select * from product_details where userid =:v1 and productid = :v2", 
			nativeQuery = true)
	public ProductDetails checkIfReviewExists(@Param("v1") String userid, @Param("v2") int productid);
	
	@Query
	(value = "select sum(ratings) from product_details where productid =:v1 and approval = 'yes' ", 
			nativeQuery = true)
	public int getRatings(@Param("v1") int userid);
	
	@Query
	(value = "select count(*) from product_details where productid =:v1 and approval = 'yes' ", 
			nativeQuery = true)
	public int getReviewCount(@Param("v1") int userid);
	
}

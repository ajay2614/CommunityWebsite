package com.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.model.Product;


public interface ProductDao extends JpaRepository<Product,Integer> {

	List<Product> findByBrand(String Brand);
	
	List<Product> findByProductName(String Productname);
	
	List<Product> findByProductCode(int id);
	
	@Query(value = "select count(*) from product", 
			nativeQuery = true)
	int findTotalProducts();
	
	@Query(value = "select * from product where brand=:v1 and product_name=:v2", 
			nativeQuery = true)
	List<Product> productByProductBrandandName(@Param("v1") String value1,@Param("v2") String value2);
	
	@Query(value = "select * from product where product_code=:v1 and product_name=:v2", 
			nativeQuery = true)
	List<Product> productByProductCodeandName(@Param("v1") int value1,@Param("v2") String value2);
	
	@Query(value = "select * from product where brand=:v1 and product_code=:v2", 
			nativeQuery = true)
	List<Product> productByProductBrandandCode(@Param("v1") String value1,@Param("v2") int value2);
	
	@Query(value = "select * from product where brand=:v1 and product_code=:v2 and product_name=:v3", 
			nativeQuery = true)
	List<Product> productByProductBrandandCodeandName(@Param("v1") String value1,@Param("v2") int value2, @Param("v3") String value3);
	
//	@Query("from Product where brand=?1 or product_name=?1 or product_code=?1")
//	List<Product> findProduct(String brand);
//	
//	@Query(value = "select * from product where product_name in (select product_name from product where product_code=:v1 or product_name =:v1 or  brand=:v1) \r\n"
//			+ "and product_code in (select product_code from product where product_code=:v1 or product_name =:v1 or  brand=:v1)\r\n"
//			+ "and brand in (select brand from product where product_code=:v1 or product_name =:v1 or  brand=:v1) and product_name=:v2", 
//			nativeQuery = true)
//	List<Product> findFilteredProductByProductName(@Param("v1") String value1, @Param("v2") String value2);
//	
//	@Query(value = "select * from product where product_name in (select product_name from product where product_code=:v1 or product_name =:v1 or  brand=:v1) \r\n"
//			+ "and product_code in (select product_code from product where product_code=:v1 or product_name =:v1 or  brand=:v1)\r\n"
//			+ "and brand in (select brand from product where product_code=:v1 or product_name =:v1 or  brand=:v1) and product_code=:v2", 
//			nativeQuery = true)
//	List<Product> findFilteredProductByProductCode(@Param("v1") String value1, @Param("v2") String value2);
//	
//	
//	@Query(value = "select * from product where product_name in (select product_name from product where product_code=:v1 or product_name =:v1 or  brand=:v1) \r\n"
//			+ "and product_code in (select product_code from product where product_code=:v1 or product_name =:v1 or  brand=:v1)\r\n"
//			+ "and brand in (select brand from product where product_code=:v1 or product_name =:v1 or  brand=:v1) and brand=:v2", 
//			nativeQuery = true)
//	List<Product> findFilteredProductByProductBrand(@Param("v1") String value1,@Param("v2") String value2);
//	
	
	@Query("FROM Product where Product_Code IN :v1 and brand=:v2")
	List<Product> findFilteredProductByProductBrand(@Param("v1") List<Integer> value1, @Param("v2") String value2);
	
	@Query("FROM Product where Product_Code IN :v1 and product_code=:v2")
	List<Product> findFilteredProductByProductCode(@Param("v1") List<Integer> value1, @Param("v2") int value2);
	
	@Query("FROM Product where Product_Code IN :v1 and product_name=:v2")
	List<Product> findFilteredProductByProductName(@Param("v1") List<Integer> value1, @Param("v2") String value2);
	
//	@Modifying
//	@Transactional
//	@Query(value = "update product set ratings = coalesce(ratings + :v1, ratings, :v1, 0) , total_ratings = coalesce(total_ratings + 1, total_ratings, 1, 0) where product_code = :v2\r\n"
//			+ "", 
//			nativeQuery = true)
//	public int setRatingsByProductId(@Param("v1") int ratings, @Param ("v2") int productCode);
//	
//	
//	@Query(value = "select ratings from product where product_code=:v1", 
//			nativeQuery = true)
//	public int getRatingsByProductId(@Param ("v1") int productCode);
//	
//	@Query(value = "select total_ratings from product where product_code=:v1", 
//			nativeQuery = true)
//	public int getTotalRatingsByProductId(@Param ("v1") int productCode);
	
	@Query(value = "select * from product where product_code in :v1", 
			nativeQuery = true)
	public List<Product> getProductsByProductId(@Param ("v1") List<Integer> productCode);
	
}

package com.sumedh.rd.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sumedh.rd.entity.RdUser;

public interface RDUserRepository extends JpaRepository<RdUser, Integer>{
	
	Optional<RdUser> findByAadharNumber(String aadharNumber);
	long countByRdStatus(int rdStatus);

	
	@Query("SELECT MAX(r.accountNumber) FROM RdUser r")
	String findLastAccountNumber();
	
	// PURPOSE: Exact paid installments count nikalne ke liye (flag = 1)

	@Query(
	    value = "select count(*) from rd_user_passbook where rd_id = :rdId and flag = 1",
	    nativeQuery = true
	)
	int countPaidInstallments(@Param("rdId") int rdId);
	// For card
	@Query("select count(r) from RdUser r where r.rdStatus in (2,3)")
	Long totalClosedRds();




}

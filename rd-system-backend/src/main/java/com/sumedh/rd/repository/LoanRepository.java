package com.sumedh.rd.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sumedh.rd.entity.Loan;

public interface LoanRepository extends JpaRepository<Loan, Integer> {

    // User ke saare loans
    List<Loan> findByRdId(int rdId);

    // Status wise loans (admin use)
    List<Loan> findByStatus(int status);

    // IMPORTANT:
    // Check if user already has ACTIVE loan
    // status 0 = PENDING, 1 = APPROVED
    List<Loan> findByRdIdAndStatusIn(int rdId, List<Integer> status);
    
    // This is for to get the total sum of approved loans
    @Query(
    		  value = "select coalesce(sum(requested_amount),0) from loan where status = 1",
    		  nativeQuery = true
    		)
    		Long sumApprovedLoans();

}

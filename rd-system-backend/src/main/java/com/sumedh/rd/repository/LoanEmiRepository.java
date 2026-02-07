package com.sumedh.rd.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sumedh.rd.entity.LoanEmi;

public interface LoanEmiRepository extends JpaRepository<LoanEmi, Integer> {

    List<LoanEmi> findByLoanId(int loanId);

    List<LoanEmi> findByLoanIdAndStatus(int loanId, int status);
    // This is for to get the total of paid emis 
    @Query(
    		  value = "select coalesce(sum(emi_amount),0) from loan_emi where status = 1",
    		  nativeQuery = true
    		)
    		Long sumPaidEmis();

}

package com.sumedh.rd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sumedh.rd.entity.MaturityHistory;

public interface MaturityHistoryRepository extends JpaRepository<MaturityHistory, Integer> {
	 List<MaturityHistory> findByStatus(int status);
	 boolean existsByRdIdAndStatus(int rdId, int status);
	 // For card 
	 @Query("select coalesce(sum(m.maturityAmount),0) from MaturityHistory m where m.status = 1")
	 Long totalMaturityPaid();

	 @Query("select count(distinct m.rdId) from MaturityHistory m where m.status = 1")
	 Long totalMaturityUsers();

}

package com.sumedh.rd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sumedh.rd.entity.PrematureCloseHistory;

public interface PrematureCloseRepository
        extends JpaRepository<PrematureCloseHistory, Integer> {
	
	List<PrematureCloseHistory> findByStatus(int status);
	// For cards
	@Query("select coalesce(sum(p.payoutAmount),0) from PrematureCloseHistory p where p.status = 1")
	Long totalPrematurePaid();

	@Query("select count(distinct p.rdId) from PrematureCloseHistory p where p.status = 1")
	Long totalPrematureUsers();

}


package com.sumedh.rd.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sumedh.rd.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Integer> {

    Optional<Admin> findByUsernameAndPassword(String username, String password);
}

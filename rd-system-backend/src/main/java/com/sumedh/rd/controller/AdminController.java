package com.sumedh.rd.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sumedh.rd.entity.Admin;
import com.sumedh.rd.repository.MaturityHistoryRepository;
import com.sumedh.rd.repository.PrematureCloseRepository;
import com.sumedh.rd.repository.RDUserRepository;
import com.sumedh.rd.service.AdminService;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private AdminService adminService;

    //  Admin login
    @PostMapping("/login")
    public Admin login(@RequestBody Admin admin) {
        return adminService.login(
                admin.getUsername(),
                admin.getPassword()
        );
    }

    // Dashboard (ALL cards here)
    @GetMapping("/dashboard")
    public Map<String, Object> dashboard() {
        return adminService.getDashboardData();
    }

    // Close RD
    @PutMapping("/close-rd/{rdId}")
    public String closeRd(@PathVariable int rdId) {
        return adminService.closeRdByAdmin(rdId);
    }
}


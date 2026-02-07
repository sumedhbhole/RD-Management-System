package com.sumedh.rd.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sumedh.rd.entity.MaturityHistory;
import com.sumedh.rd.entity.RdUser;
import com.sumedh.rd.repository.MaturityHistoryRepository;
import com.sumedh.rd.repository.RDUserRepository;

@RestController
@RequestMapping("/admin/maturity")
@CrossOrigin
public class AdminMaturityController {

    @Autowired
    private MaturityHistoryRepository maturityRepo;

    @Autowired
    private RDUserRepository rdUserRepo;

    // GET ALL PENDING MATURITY REQUESTS
    @GetMapping("/pending")
    public List<MaturityHistory> getPendingRequests() {
        return maturityRepo.findByStatus(0); // PENDING
    }

    // APPROVE MATURITY
    @PutMapping("/approve/{id}")
    public String approveMaturity(@PathVariable("id") int id) {

        MaturityHistory history = maturityRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        if (history.getStatus() != 0) {
            throw new RuntimeException("Already processed");
        }

        // history update
        history.setStatus(1); // APPROVED
        history.setApprovedDate(LocalDate.now());
        history.setPayoutDate(LocalDate.now()); // 💰 MONEY CREDITED

        maturityRepo.save(history);

        // RD user update
        RdUser user = rdUserRepo.findById(history.getRdId())
                .orElseThrow(() -> new RuntimeException("RD User not found"));

        user.setRdStatus(3); // MATURITY PAID
        rdUserRepo.save(user);

        return "Maturity approved & amount credited";
    }


    // REJECT MATURITY
    @PutMapping("/reject/{id}")
    public String rejectMaturity(@PathVariable("id") int id) {

        MaturityHistory history = maturityRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        if (history.getStatus() != 0) {
            throw new RuntimeException("Request already processed");
        }

        history.setStatus(2); // REJECTED
        history.setApprovedDate(LocalDate.now());
        maturityRepo.save(history);

        return "Maturity request rejected";
    }
    
    
    @GetMapping("/all")
    public List<MaturityHistory> getAllRequests() {
        return maturityRepo.findAll();
    }

}

package com.sumedh.rd.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sumedh.rd.entity.PrematureCloseHistory;
import com.sumedh.rd.entity.RdUser;
import com.sumedh.rd.repository.PrematureCloseRepository;
import com.sumedh.rd.repository.RDUserRepository;

@RestController
@RequestMapping("/admin/premature")
@CrossOrigin
public class AdminPrematureController {

    @Autowired
    private PrematureCloseRepository prematureRepo;

    @Autowired
    private RDUserRepository rdUserRepo;

    // GET ALL PREMATURE REQUESTS (Pending)
    @GetMapping("/pending")
    public List<PrematureCloseHistory> getPendingRequests() {
        return prematureRepo.findByStatus(0); // PENDING
    }

    // APPROVE PREMATURE CLOSE
    @PutMapping("/approve/{id}")
    public String approvePremature(@PathVariable("id") int id) {

        PrematureCloseHistory history = prematureRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        if (history.getStatus() != 0) {
            throw new RuntimeException("Request already processed");
        }

        // mark history approved
        history.setStatus(1);
        history.setApprovedDate(LocalDate.now());
        prematureRepo.save(history);

        // update RD user
        RdUser user = rdUserRepo.findById(history.getRdId())
                .orElseThrow(() -> new RuntimeException("RD User not found"));

        user.setRdStatus(2); // PREMATURE CLOSED
        rdUserRepo.save(user);

        return "Premature close approved";
    }

    //  REJECT PREMATURE CLOSE
    @PutMapping("/reject/{id}")
    public String rejectPremature(@PathVariable("id") int id) {

        PrematureCloseHistory history = prematureRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        if (history.getStatus() != 0) {
            throw new RuntimeException("Request already processed");
        }

        history.setStatus(2); // REJECTED
        history.setApprovedDate(LocalDate.now());
        prematureRepo.save(history);

        return "Premature close rejected";
    }
}

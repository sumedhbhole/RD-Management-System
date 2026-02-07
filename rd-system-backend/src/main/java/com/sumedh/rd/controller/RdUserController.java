package com.sumedh.rd.controller;

import com.sumedh.rd.service.PassbookService;
import com.sumedh.rd.service.RdUserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sumedh.rd.entity.MaturityHistory;
import com.sumedh.rd.entity.PrematureCloseHistory;
import com.sumedh.rd.entity.RdUser;
import com.sumedh.rd.repository.RDUserRepository;

@RestController
public class RdUserController {

    @Autowired
    private PassbookService passbookService;

    @Autowired
    private RdUserService rdUserService; // RD logic

    @Autowired
    private RDUserRepository repository;

    // ================= GET ALL RD USERS =================
    @GetMapping("/rduser")
    public List<RdUser> geRdUsers() {
        return repository.findAll();
    }

    // ================= INSERT RD USER =================
    @PostMapping("/insert")
    public RdUser insertRdUser(@RequestBody RdUser rdinsert) {

        // prepare RD logic (account number, interest, maturity)
        RdUser preparedUser = rdUserService.prepareUserWithRdLogic(rdinsert);

        // save user
        RdUser savedUser = repository.save(preparedUser);

        // auto create passbook
        passbookService.createPassbookForUser(savedUser);

        return savedUser;
    }

    // ================= UPDATE RD USER =================
    @PutMapping("/update")
    public RdUser updateRdUser(@RequestBody RdUser rdupdate) {
        return repository.save(rdupdate);
    }

    // ================= DELETE RD USER =================
    @DeleteMapping("/delete/{rdId}")
    public String deleteuser(@PathVariable("rdId") int rdId) {
        repository.deleteById(rdId);
        return "Delete user successfully... " + rdId;
    }

    // ================= LOGIN =================
    @GetMapping("/login/{aadhar}")
    public RdUser loginByAadhar(@PathVariable("aadhar") String aadhar) {
        return repository.findByAadharNumber(aadhar)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // ================= MATURITY REQUEST =================
    @PutMapping("/maturity/{rdId}")
    public String maturityPayout(
            @PathVariable("rdId") int rdId,
            @RequestBody MaturityHistory bankData
    ) {
        return rdUserService.maturityPayout(rdId, bankData);
    }

    // ================= PREMATURE CLOSE =================
    @PutMapping("/premature-close/{rdId}")
    public String prematureClose(
            @PathVariable("rdId") int rdId,
            @RequestBody PrematureCloseHistory bankData
    ) {
        return rdUserService.prematureClose(rdId, bankData);
    }

}


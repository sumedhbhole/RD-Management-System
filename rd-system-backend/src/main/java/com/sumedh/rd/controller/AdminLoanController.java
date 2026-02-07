package com.sumedh.rd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.sumedh.rd.entity.LoanEmi;
import com.sumedh.rd.repository.LoanEmiRepository;
import com.sumedh.rd.entity.Loan;
import com.sumedh.rd.service.LoanService;

@RestController
@RequestMapping("/admin/loan")
@CrossOrigin
public class AdminLoanController {

    @Autowired
    private LoanService loanService;
    @Autowired
    private LoanEmiRepository loanEmiRepository;


    // ================= GET ALL LOANS =================
    @GetMapping("/all")
    public List<Loan> getAllLoans() {
        return loanService.getAllLoans();
    }

    // ================= APPROVE LOAN =================
    @PutMapping("/approve/{loanId}")
    public String approve(@PathVariable("loanId") int loanId) {
        return loanService.approveLoan(loanId);
    }

    // ================= REJECT LOAN =================
    @PutMapping("/reject/{loanId}")
    public String reject(@PathVariable("loanId") int loanId) {
        return loanService.rejectLoan(loanId);
    }
    // ================= VIEW LOAN EMIS (ADMIN) =================
    @GetMapping("/emis/{loanId}")
    public List<LoanEmi> getLoanEmis(@PathVariable("loanId") int loanId) {
        return loanEmiRepository.findByLoanId(loanId);
    }

}

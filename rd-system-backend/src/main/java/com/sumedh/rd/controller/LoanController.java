package com.sumedh.rd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sumedh.rd.entity.Loan;
import com.sumedh.rd.entity.LoanEmi;
import com.sumedh.rd.repository.LoanEmiRepository;
import com.sumedh.rd.repository.LoanRepository;
import com.sumedh.rd.service.LoanService;

@RestController
@RequestMapping("/loan")
@CrossOrigin
public class LoanController {

    @Autowired
    private LoanService loanService;

    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private LoanEmiRepository loanEmiRepository;

    // ================= USER APPLY LOAN =================
    @PostMapping("/apply")
    public String applyLoan(@RequestBody Loan loan) {
        return loanService.applyLoan(loan);
    }

    // ================= USER VIEW LOANS =================
    @GetMapping("/rd/{rdId}")
    public List<Loan> getLoansByRdId(@PathVariable("rdId") int rdId) {
        return loanRepository.findByRdId(rdId);
    }

    // ================= USER VIEW EMI LIST =================
    @GetMapping("/emi/{loanId}")
    public List<LoanEmi> getEmisByLoan(@PathVariable("loanId") int loanId) {
        return loanEmiRepository.findByLoanId(loanId);
    }

    // ================= USER PAY EMI =================
    @PutMapping("/emi/pay/{emiId}")
    public String payEmi(@PathVariable("emiId") int emiId) {
        return loanService.payEmi(emiId);
    }
}

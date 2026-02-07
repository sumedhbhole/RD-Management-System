package com.sumedh.rd.service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sumedh.rd.entity.Loan;
import com.sumedh.rd.entity.LoanEmi;
import com.sumedh.rd.entity.RdUser;
import com.sumedh.rd.repository.LoanEmiRepository;
import com.sumedh.rd.repository.LoanRepository;
import com.sumedh.rd.repository.RDUserRepository;

@Service
public class LoanService {

    @Autowired
    private LoanEmiRepository loanEmiRepository;

    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private RDUserRepository userRepository;

    // ================= APPLY LOAN =================
    public String applyLoan(Loan loan) {

        RdUser user = userRepository.findById(loan.getRdId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // RD eligibility
        if (user.getRdStatus() != 0 || user.getPaidInstallments() < 6) {
            return "User not eligible for loan";
        }

        // ONE ACTIVE LOAN RULE (PENDING / APPROVED)
        List<Loan> activeLoans = loanRepository.findByRdIdAndStatusIn(
                loan.getRdId(),
                Arrays.asList(0, 1)
        );

        if (!activeLoans.isEmpty()) {
            return "You already have an active loan. Close it before applying again.";
        }

        if (loan.getRequestedAmount() > loan.getEligibleAmount()) {
            return "Requested amount exceeds eligible limit";
        }

        loan.setStatus(0); // PENDING
        loan.setAppliedDate(LocalDate.now());

        loanRepository.save(loan);

        return "Loan applied successfully. Status: Pending";
    }

    // ================= APPROVE LOAN + EMI CREATE =================
    public String approveLoan(int loanId) {

        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Loan not found"));

        // mark loan approved
        loan.setStatus(1); // APPROVED
        loanRepository.save(loan);

        // ===== EMI GENERATION WITH 6% INTEREST =====
        int totalMonths = 12;
        double interestRate = 6.0;

        // interest calculation
        double interest =
                loan.getRequestedAmount() * interestRate / 100;

        // total payable amount
        int totalPayable =
                (int) Math.round(loan.getRequestedAmount() + interest);

        // EMI amount
        int emiAmount = totalPayable / totalMonths;

        for (int i = 1; i <= totalMonths; i++) {
            LoanEmi emi = new LoanEmi();
            emi.setLoanId(loan.getLoanId());
            emi.setRdId(loan.getRdId());
            emi.setMonthNo(i);
            emi.setEmiAmount(emiAmount);
            emi.setEmiDate(LocalDate.now().plusMonths(i));
            emi.setStatus(0); // UNPAID

            loanEmiRepository.save(emi);
        }

        return "Loan approved with 6% interest & EMI schedule created";
    }


    // ================= PAY EMI =================
    public String payEmi(int emiId) {

        LoanEmi emi = loanEmiRepository.findById(emiId)
                .orElseThrow(() -> new RuntimeException("EMI not found"));

        Loan loan = loanRepository.findById(emi.getLoanId())
                .orElseThrow(() -> new RuntimeException("Loan not found"));

        // ✅ EMI sirf APPROVED loan ke liye
        if (loan.getStatus() != 1) {
            return "EMI payment not allowed. Loan is not active.";
        }

        if (emi.getStatus() == 1) {
            return "EMI already paid";
        }

        // mark EMI paid
        emi.setStatus(1);
        loanEmiRepository.save(emi);

        // check remaining unpaid EMIs
        List<LoanEmi> unpaidEmis =
                loanEmiRepository.findByLoanIdAndStatus(
                        emi.getLoanId(), 0);

        if (unpaidEmis.isEmpty()) {
            loan.setStatus(3); // ✅ CLOSED
            loanRepository.save(loan);

            return "EMI paid. Loan CLOSED successfully";
        }

        return "EMI paid successfully";
    }


    // ================= REJECT LOAN =================
    public String rejectLoan(int loanId) {

        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Loan not found"));

        loan.setStatus(2); // REJECTED
        loanRepository.save(loan);

        return "Loan rejected";
    }

    // ================= ADMIN DASHBOARD =================
    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }
}

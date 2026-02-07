package com.sumedh.rd.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit; // ✅ REQUIRED for late days calculation
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sumedh.rd.entity.RdUser;
import com.sumedh.rd.entity.RdUserPassbook;
import com.sumedh.rd.passbookdto.UserPassbookDTO;
import com.sumedh.rd.repository.PassbookRepository;
import com.sumedh.rd.repository.RDUserRepository;

@Service
public class PassbookService {
	

    //  NEW: User repository (RD status & paidInstallments update ke liye)
    @Autowired
    private RDUserRepository userRepository;

    @Autowired
    private PassbookRepository passbookRepository;

    /* ===============================
       EXISTING DTO METHODS (KEEP)
       =============================== */

    public List<UserPassbookDTO> getDetail() {
        return passbookRepository.getUserPassbookDetailsDto();
    }

    public List<UserPassbookDTO> getUserPassbookDetailsById(int rd_id) {
        return passbookRepository.getUserPassbookDetailDto(rd_id);
    }

    /* ===============================
       NEW: AUTO PASSBOOK CREATION
       =============================== */

    public void createPassbookForUser(RdUser user) {

        LocalDate startDate = user.getRdDate();
        int months = user.getRdDurationMonths();
        int monthlyAmount = user.getMonthlyAmount();

        for (int i = 0; i < months; i++) {
            RdUserPassbook passbook = new RdUserPassbook();

            passbook.setRdId(user.getRdId());
            passbook.setRddate(startDate.plusMonths(i));
            passbook.setRdamount(monthlyAmount);
            passbook.setLateday(0);
            passbook.setFineamount(0);

            // flag = 0 → Pending installment
            passbook.setFlag(0);

            passbookRepository.save(passbook);
        }
    }

    // ================= NEW: PAY RD INSTALLMENT =================
    //  PURPOSE: Ek-ek installment pay karna
    //  RULE:
    //    - Sirf next pending installment hi pay hogi
    //    - Last installment par RD complete ho jayegi

    public String payNextInstallment(int rdId) {

        //  User fetch
        RdUser user = userRepository.findById(rdId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        //  Check RD active hai ya nahi
        if (user.getRdStatus() != 0) {
            return "RD is not active";
        }

        //  Next pending installment lao
        RdUserPassbook passbook =
                passbookRepository.findNextPendingInstallment(rdId);

        if (passbook == null) {
            return "All installments already paid";
        }

        // ================= LATE FINE LOGIC (NEW) =================
        // RULE: ₹50 per day after due date

        LocalDate today = LocalDate.now();
        LocalDate dueDate = passbook.getRddate();

        int lateDays = 0;
        int fineAmount = 0;

        if (today.isAfter(dueDate)) {
            lateDays = (int) ChronoUnit.DAYS.between(dueDate, today);
            fineAmount = lateDays * 50;
        }
        // =========================================================

        //  Installment paid mark karo
        passbook.setFlag(1);           // Paid
        passbook.setLateday(lateDays); // ✅ calculated
        passbook.setFineamount(fineAmount); // ✅ calculated

        passbookRepository.save(passbook);

        // ================= FIX =================
        //  Increment unreliable hai
        //  DB se exact count nikal rahe hai
        
        int paidCount = userRepository.countPaidInstallments(rdId);
        user.setPaidInstallments(paidCount);
        
        //  Agar last installment hai → RD Completed

        if (paidCount == user.getTotalInstallments()) {
            user.setRdStatus(1); // Completed
        }

        userRepository.save(user);

        return "RD installment paid successfully. Fine ₹" + fineAmount;
    }
    
    // ================= NEW METHOD =================
    //  Exact passbook installment pay karna (late fine ke sath)

    public String payInstallmentByPassbookId(int passbookId) {

        RdUserPassbook passbook = passbookRepository.findById(passbookId)
            .orElseThrow(() -> new RuntimeException("Installment not found"));

        //  Agar already paid hai
        if (passbook.getFlag() == 1) {
            return "Installment already paid";
        }

        LocalDate today = LocalDate.now();
        LocalDate dueDate = passbook.getRddate();

        int lateDays = 0;
        int fineAmount = 0;

        //  Late fine logic (₹50 per day)
        if (today.isAfter(dueDate)) {
            lateDays = (int) ChronoUnit.DAYS.between(dueDate, today);
            fineAmount = lateDays * 50;
        }

        //  Passbook update
        passbook.setFlag(1);                // Paid
        passbook.setLateday(lateDays);      // Save late days
        passbook.setFineamount(fineAmount); // Save fine

        passbookRepository.save(passbook);

        // User RD update
        RdUser user = userRepository.findById(passbook.getRdId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        int paidCount = userRepository.countPaidInstallments(user.getRdId());
        user.setPaidInstallments(paidCount);

        if (paidCount == user.getTotalInstallments()) {
            user.setRdStatus(1); // RD Completed
        }

        userRepository.save(user);

        return "RD installment paid. Fine ₹" + fineAmount;
    }

}

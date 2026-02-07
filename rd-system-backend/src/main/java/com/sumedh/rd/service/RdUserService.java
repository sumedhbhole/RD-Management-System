package com.sumedh.rd.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sumedh.rd.entity.MaturityHistory;
import com.sumedh.rd.entity.PrematureCloseHistory;
import com.sumedh.rd.entity.RdUser;
import com.sumedh.rd.repository.MaturityHistoryRepository;
import com.sumedh.rd.repository.PrematureCloseRepository;
import com.sumedh.rd.repository.RDUserRepository;

@Service
public class RdUserService {

    @Autowired
    private RDUserRepository repository;

    @Autowired
    private PrematureCloseRepository prematureRepo;

    @Autowired
    private MaturityHistoryRepository maturityHistoryRepository;

    // ================= ACCOUNT NUMBER =================
    public String generateAccountNumber() {

        String lastAccNo = repository.findLastAccountNumber();

        if (lastAccNo == null) {
            return "SBRD001";
        }

        int lastNumber = Integer.parseInt(lastAccNo.substring(4));
        return String.format("SBRD%03d", lastNumber + 1);
    }

    // ================= RD CREATE LOGIC =================
    public RdUser prepareUserWithRdLogic(RdUser user) {

        user.setAccountNumber(generateAccountNumber());

        int totalDeposit = user.getRdDurationMonths() * user.getMonthlyAmount();
        user.setTotalDeposit(totalDeposit);

        double interestRate = 0;
        if (user.getRdDurationMonths() == 12) interestRate = 12;
        else if (user.getRdDurationMonths() == 24) interestRate = 15;

        user.setInterestRate(interestRate);

        int maturityAmount =
                totalDeposit + (int) (totalDeposit * interestRate / 100);
        user.setMaturityAmount(maturityAmount);

        user.setPaidInstallments(0);
        user.setTotalInstallments(user.getRdDurationMonths());
        user.setRdStatus(0); // ACTIVE

        return user;
    }

 // ================= PREMATURE CLOSE (REQUEST ONLY) =================
    public String prematureClose(int rdId, PrematureCloseHistory bankData) {

        RdUser user = repository.findById(rdId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRdStatus() != 0) {
            throw new RuntimeException("RD is not active");
        }

        int paidAmount =
                user.getPaidInstallments() * user.getMonthlyAmount();
        int payoutAmount = paidAmount / 2;

        PrematureCloseHistory history = new PrematureCloseHistory();
        history.setRdId(rdId);
        history.setAccountNumber(user.getAccountNumber());
        history.setPaidInstallments(user.getPaidInstallments());
        history.setPaidAmount(paidAmount);
        history.setPayoutAmount(payoutAmount);

        history.setBankName(bankData.getBankName());
        history.setAccountHolderName(bankData.getAccountHolderName());
        history.setAccountNumberCredited(bankData.getAccountNumberCredited());
        history.setIfscCode(bankData.getIfscCode());

        //  ADMIN FLOW
        history.setStatus(0); // PENDING
        history.setRequestDate(LocalDate.now());

        prematureRepo.save(history);

        return "Premature close request submitted for admin approval";
    }



    // ================= MATURITY REQUEST (USER SIDE) =================
    public String maturityPayout(int rdId, MaturityHistory bankData) {

        RdUser user = repository.findById(rdId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRdStatus() != 1) {
            throw new RuntimeException("RD not completed yet");
        }

        // prevent duplicate request
        if (maturityHistoryRepository.existsByRdIdAndStatus(rdId, 0)) {
            throw new RuntimeException("Maturity request already pending");
        }

        bankData.setRdId(rdId);
        bankData.setAccountNumber(user.getAccountNumber());
        bankData.setMaturityAmount(user.getMaturityAmount());

        bankData.setStatus(0); // 🟡 PENDING
        bankData.setRequestDate(LocalDate.now());

        //  NO payoutDate here
        maturityHistoryRepository.save(bankData);

        return "Maturity request submitted for admin approval";
    }

}

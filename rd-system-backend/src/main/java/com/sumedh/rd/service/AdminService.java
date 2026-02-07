package com.sumedh.rd.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sumedh.rd.entity.Admin;
import com.sumedh.rd.entity.RdUser;
import com.sumedh.rd.repository.AdminRepository;
import com.sumedh.rd.repository.PassbookRepository;
import com.sumedh.rd.repository.PrematureCloseRepository;
import com.sumedh.rd.repository.RDUserRepository;
import com.sumedh.rd.repository.LoanRepository;
import com.sumedh.rd.repository.MaturityHistoryRepository;
import com.sumedh.rd.repository.LoanEmiRepository;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private RDUserRepository userRepository;

    @Autowired
    private PassbookRepository passbookRepository;

    // 🔥 NEW
    @Autowired
    private LoanRepository loanRepository;

    // 🔥 NEW
    @Autowired
    private LoanEmiRepository loanEmiRepository;
    
    @Autowired
    private MaturityHistoryRepository maturityRepo;

    @Autowired
    private PrematureCloseRepository prematureRepo;


    //  Admin login
    public Admin login(String username, String password) {
        return adminRepository
                .findByUsernameAndPassword(username, password)
                .orElseThrow(() -> new RuntimeException("Invalid admin credentials"));
    }

    // ADMIN DASHBOARD DATA (FINAL)
    public Map<String, Object> getDashboardData() {

        Map<String, Object> data = new HashMap<>();

        data.put("totalUsers", userRepository.count());
        data.put("activeRD", userRepository.countByRdStatus(0));
        data.put("completedRD", userRepository.countByRdStatus(1));
        data.put("totalRDCollection", passbookRepository.sumOfrdAmount());

        //  LOAN & EMI METRICS
        data.put("totalLoanDistributed", loanRepository.sumApprovedLoans());
        data.put("totalEmiCollected", loanEmiRepository.sumPaidEmis());
        
     // ===== MATURITY =====
        data.put("maturityPaid", maturityRepo.totalMaturityPaid());
        data.put("maturityUsers", maturityRepo.totalMaturityUsers());

        // ===== PREMATURE =====
        data.put("prematurePaid", prematureRepo.totalPrematurePaid());
        data.put("prematureUsers", prematureRepo.totalPrematureUsers());

        // ===== CLOSED RD =====
        data.put("closedRds", userRepository.totalClosedRds());


        return data;
    }

    //  Close RD by Admin
    public String closeRdByAdmin(int rdId) {

        RdUser user = userRepository.findById(rdId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRdStatus() != 0) {
            return "RD is not active";
        }

        user.setRdStatus(2); // CLOSED
        userRepository.save(user);

        return "RD closed successfully by admin";
    }
}

package com.sumedh.rd.entity;

import java.time.LocalDate;
import jakarta.persistence.*;

@Entity
public class PrematureCloseHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int rdId;
    private String accountNumber;

    private int paidInstallments;
    private int paidAmount;
    private int payoutAmount;

    private String bankName;
    private String accountHolderName;
    private String accountNumberCredited;
    private String ifscCode;

    // ===== ADMIN FLOW =====
    private int status;
    // 0 = PENDING
    // 1 = APPROVED
    // 2 = REJECTED

    private LocalDate requestDate;   // user clicked premature close
    private LocalDate approvedDate;  // admin approved / rejected
    private LocalDate payoutDate;    // money credited (final)

    // ===== getters & setters =====

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getRdId() { return rdId; }
    public void setRdId(int rdId) { this.rdId = rdId; }

    public String getAccountNumber() { return accountNumber; }
    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public int getPaidInstallments() { return paidInstallments; }
    public void setPaidInstallments(int paidInstallments) {
        this.paidInstallments = paidInstallments;
    }

    public int getPaidAmount() { return paidAmount; }
    public void setPaidAmount(int paidAmount) { this.paidAmount = paidAmount; }

    public int getPayoutAmount() { return payoutAmount; }
    public void setPayoutAmount(int payoutAmount) {
        this.payoutAmount = payoutAmount;
    }

    public String getBankName() { return bankName; }
    public void setBankName(String bankName) { this.bankName = bankName; }

    public String getAccountHolderName() { return accountHolderName; }
    public void setAccountHolderName(String accountHolderName) {
        this.accountHolderName = accountHolderName;
    }

    public String getAccountNumberCredited() {
        return accountNumberCredited;
    }
    public void setAccountNumberCredited(String accountNumberCredited) {
        this.accountNumberCredited = accountNumberCredited;
    }

    public String getIfscCode() { return ifscCode; }
    public void setIfscCode(String ifscCode) { this.ifscCode = ifscCode; }

    public int getStatus() { return status; }
    public void setStatus(int status) { this.status = status; }

    public LocalDate getRequestDate() { return requestDate; }
    public void setRequestDate(LocalDate requestDate) {
        this.requestDate = requestDate;
    }

    public LocalDate getApprovedDate() { return approvedDate; }
    public void setApprovedDate(LocalDate approvedDate) {
        this.approvedDate = approvedDate;
    }

    public LocalDate getPayoutDate() { return payoutDate; }
    public void setPayoutDate(LocalDate payoutDate) {
        this.payoutDate = payoutDate;
    }
}

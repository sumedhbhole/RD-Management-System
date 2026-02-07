package com.sumedh.rd.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "loan")
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int loanId;

    private int rdId;

    private int requestedAmount;
    private int eligibleAmount;

    private String purpose;

    private String guarantor1Aadhar;
    private String guarantor2Aadhar;

    //  BANK DETAILS (NEW)
    private String bankName;
    private String accountHolderName;
    private String accountNumber;
    private String ifscCode;

    // 0 = PENDING | 1 = APPROVED | 2 = REJECTED | 3 = CLOSED
    private int status;

    private LocalDate appliedDate;

    // ---------- getters & setters ----------

    public int getLoanId() { return loanId; }
    public void setLoanId(int loanId) { this.loanId = loanId; }

    public int getRdId() { return rdId; }
    public void setRdId(int rdId) { this.rdId = rdId; }

    public int getRequestedAmount() { return requestedAmount; }
    public void setRequestedAmount(int requestedAmount) { this.requestedAmount = requestedAmount; }

    public int getEligibleAmount() { return eligibleAmount; }
    public void setEligibleAmount(int eligibleAmount) { this.eligibleAmount = eligibleAmount; }

    public String getPurpose() { return purpose; }
    public void setPurpose(String purpose) { this.purpose = purpose; }

    public String getGuarantor1Aadhar() { return guarantor1Aadhar; }
    public void setGuarantor1Aadhar(String guarantor1Aadhar) {
        this.guarantor1Aadhar = guarantor1Aadhar;
    }

    public String getGuarantor2Aadhar() { return guarantor2Aadhar; }
    public void setGuarantor2Aadhar(String guarantor2Aadhar) {
        this.guarantor2Aadhar = guarantor2Aadhar;
    }

    public String getBankName() { return bankName; }
    public void setBankName(String bankName) { this.bankName = bankName; }

    public String getAccountHolderName() { return accountHolderName; }
    public void setAccountHolderName(String accountHolderName) {
        this.accountHolderName = accountHolderName;
    }

    public String getAccountNumber() { return accountNumber; }
    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getIfscCode() { return ifscCode; }
    public void setIfscCode(String ifscCode) { this.ifscCode = ifscCode; }

    public int getStatus() { return status; }
    public void setStatus(int status) { this.status = status; }

    public LocalDate getAppliedDate() { return appliedDate; }
    public void setAppliedDate(LocalDate appliedDate) {
        this.appliedDate = appliedDate;
    }
}

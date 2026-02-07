package com.sumedh.rd.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class RdUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int rdId;

    private String customerName;
    private String mobileNumber;
    private String customerAddress;

    @Column(name = "dob")
    private LocalDate dateOfBirth;

    private String gender;

    @Column(name = "rddate")
    private LocalDate rdDate;

    // ===== RD PLAN DETAILS =====
    private int rdDurationMonths;     // 12 or 24
    private int monthlyAmount;         // monthly RD amount

    private int totalInstallments;     // 12 or 24
    private int paidInstallments;      // initially 0

    /**
     * rdStatus
     * 0 = Active
     * 1 = Completed
     * 2 = Closed (Premature)
     */
    private int rdStatus;

    // ==========================

    
    private String occupation;

    private String accountNumber;

    @Column(name = "aadhar_number", unique = true, nullable = false)
    private String aadharNumber;

    private String panNumber;
    
	// ===== NOMINEE DETAILS =====
    private String nomineeName;
    private String nomineeAddress;
    private String nomineeAadharNumber;
    private String nomineePanNumber;

    private boolean agree;
    
 // ===== RD RETURN DETAILS (NEW) =====
    private double interestRate;      // 12 or 15
    private int totalDeposit;         // duration × monthly
    private int maturityAmount;       // deposit + interest
    
    // ===== GETTERS & SETTERS =====

    public double getInterestRate() {
		return interestRate;
	}

	public void setInterestRate(double interestRate) {
		this.interestRate = interestRate;
	}

	public int getTotalDeposit() {
		return totalDeposit;
	}

	public void setTotalDeposit(int totalDeposit) {
		this.totalDeposit = totalDeposit;
	}

	public int getMaturityAmount() {
		return maturityAmount;
	}

	public void setMaturityAmount(int maturityAmount) {
		this.maturityAmount = maturityAmount;
	}




    public int getRdId() {
        return rdId;
    }

    public void setRdId(int rdId) {
        this.rdId = rdId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getCustomerAddress() {
        return customerAddress;
    }

    public void setCustomerAddress(String customerAddress) {
        this.customerAddress = customerAddress;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public LocalDate getRdDate() {
        return rdDate;
    }

    public void setRdDate(LocalDate rdDate) {
        this.rdDate = rdDate;
    }

    public int getRdDurationMonths() {
        return rdDurationMonths;
    }

    public void setRdDurationMonths(int rdDurationMonths) {
        this.rdDurationMonths = rdDurationMonths;
    }

    public int getMonthlyAmount() {
        return monthlyAmount;
    }

    public void setMonthlyAmount(int monthlyAmount) {
        this.monthlyAmount = monthlyAmount;
    }

    public int getTotalInstallments() {
        return totalInstallments;
    }

    public void setTotalInstallments(int totalInstallments) {
        this.totalInstallments = totalInstallments;
    }

    public int getPaidInstallments() {
        return paidInstallments;
    }

    public void setPaidInstallments(int paidInstallments) {
        this.paidInstallments = paidInstallments;
    }

    public int getRdStatus() {
        return rdStatus;
    }

    public void setRdStatus(int rdStatus) {
        this.rdStatus = rdStatus;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getAadharNumber() {
        return aadharNumber;
    }

    public void setAadharNumber(String aadharNumber) {
        this.aadharNumber = aadharNumber;
    }

    public String getPanNumber() {
        return panNumber;
    }

    public void setPanNumber(String panNumber) {
        this.panNumber = panNumber;
    }

    public String getNomineeName() {
        return nomineeName;
    }

    public void setNomineeName(String nomineeName) {
        this.nomineeName = nomineeName;
    }

    public String getNomineeAddress() {
        return nomineeAddress;
    }

    public void setNomineeAddress(String nomineeAddress) {
        this.nomineeAddress = nomineeAddress;
    }

    public String getNomineeAadharNumber() {
        return nomineeAadharNumber;
    }

    public void setNomineeAadharNumber(String nomineeAadharNumber) {
        this.nomineeAadharNumber = nomineeAadharNumber;
    }

    public String getNomineePanNumber() {
        return nomineePanNumber;
    }

    public void setNomineePanNumber(String nomineePanNumber) {
        this.nomineePanNumber = nomineePanNumber;
    }

    public boolean isAgree() {
        return agree;
    }

    public void setAgree(boolean agree) {
        this.agree = agree;
    }
}

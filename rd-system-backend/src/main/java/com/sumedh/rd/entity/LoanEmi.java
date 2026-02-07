package com.sumedh.rd.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "loan_emi")
public class LoanEmi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int emiId;

    private int loanId;
    private int rdId;

    private int emiAmount;
    private int monthNo;

    private LocalDate emiDate;

    // 0 = UNPAID | 1 = PAID
    private int status;

    // getters & setters
    public int getEmiId() { return emiId; }
    public void setEmiId(int emiId) { this.emiId = emiId; }

    public int getLoanId() { return loanId; }
    public void setLoanId(int loanId) { this.loanId = loanId; }

    public int getRdId() { return rdId; }
    public void setRdId(int rdId) { this.rdId = rdId; }

    public int getEmiAmount() { return emiAmount; }
    public void setEmiAmount(int emiAmount) { this.emiAmount = emiAmount; }

    public int getMonthNo() { return monthNo; }
    public void setMonthNo(int monthNo) { this.monthNo = monthNo; }

    public LocalDate getEmiDate() { return emiDate; }
    public void setEmiDate(LocalDate emiDate) { this.emiDate = emiDate; }

    public int getStatus() { return status; }
    public void setStatus(int status) { this.status = status; }
}

package com.sumedh.rd.entity;


import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class RdUserPassbook {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int passbookid;
	private int rdId;
	@Column(name = "rddate")
	private LocalDate rddate ;
	private int rdamount;
	private int lateday;
	private int fineamount;
	private int flag;
	public int getPassbookid() {
		return passbookid;
	}
	public void setPassbookid(int passbookid) {
		this.passbookid = passbookid;
	}
	public int getRdId() {
		return rdId;
	}
	public void setRdId(int rdId) {
		this.rdId = rdId;
	}
	public LocalDate getRddate() {
		return rddate;
	}
	public void setRddate(LocalDate rddate) {
		this.rddate = rddate;
	}
	public int getRdamount() {
		return rdamount;
	}
	public void setRdamount(int rdamount) {
		this.rdamount = rdamount;
	}
	public int getLateday() {
		return lateday;
	}
	public void setLateday(int lateday) {
		this.lateday = lateday;
	}
	public int getFineamount() {
		return fineamount;
	}
	public void setFineamount(int fineamount) {
		this.fineamount = fineamount;
	}
	public int getFlag() {
		return flag;
	}
	public void setFlag(int flag) {
		this.flag = flag;
	}
		
}

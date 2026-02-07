<p align="center">
  <img src="https://img.shields.io/badge/Backend-Spring%20Boot-brightgreen" />
  <img src="https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue" />
  <img src="https://img.shields.io/badge/Database-PostgreSQL-blueviolet" />
  <img src="https://img.shields.io/badge/Status-Active-success" />
  <img src="https://img.shields.io/github/repo-size/sumedhbhole/RD-Management-System" />
</p>

# 💰 RD Management System – Full Stack Web Application

A complete **Recurring Deposit (RD) Management System** built using  
**Spring Boot (Backend)** and **React + Vite (Frontend)**.

This application simulates a real-world banking RD workflow where **users can open RD accounts, pay monthly installments, apply for loans, and claim maturity**, while **admins manage approvals, payouts, and closures**.

---

## 📸 Visual Overview (Project Screenshots)

### 👤 User Module

| Feature | Preview |
|------|------|
| User Registration | ![](rd-project-screenshots/userRegistration.png) |
| User Login | ![](rd-project-screenshots/loginUser.png) |
| User Dashboard | ![](rd-project-screenshots/userDashboard.png) |
| Apply RD / Loan | ![](rd-project-screenshots/applyLoan.png) |
| Pay RD Installment | ![](rd-project-screenshots/userEmiPayPage.png) |
| RD Installments | ![](rd-project-screenshots/rdInstallments.png) |
| Passbook View | ![](rd-project-screenshots/passbookView.png) |
| EMI Approval | ![](rd-project-screenshots/payEmiButtonVisibleAfterAdminAprrove.png) |
| Maturity Button | ![](rd-project-screenshots/claimMaturityButton.png) |
| Claim Maturity | ![](rd-project-screenshots/claimMaturityUser.png) |
| Pre-Maturity RD Close | ![](rd-project-screenshots/preMaturityUserRdClose.png) |

---

### 🛠 Admin Module

| Feature | Preview |
|------|------|
| Admin Login | ![](rd-project-screenshots/adminLogin.png) |
| Admin Dashboard | ![](rd-project-screenshots/adminDashboard.png) |
| Loan Approval | ![](rd-project-screenshots/adminDashboardAfterLoanApproved.png) |
| Maturity Requests | ![](rd-project-screenshots/maturityRequestAdminPage.png) |
| Pre-Maturity Approval | ![](rd-project-screenshots/preMaturityAdminRequestApprovepage.png) |

---

## 🛠 Technical Stack

### Frontend
- React.js (Vite)
- JavaScript, HTML5, CSS3
- Bootstrap

### Backend
- Spring Boot
- Spring Data JPA
- RESTful APIs

### Database
- PostgreSQL

### Tools
- Spring Tool Suite (STS)
- VS Code
- Git & GitHub
- Postman

---

## 🚀 Core Features

### User Features
- Secure user registration & login
- RD account creation
- Monthly RD installment payment
- Loan application against RD
- View RD passbook & installment history
- Claim maturity amount
- Pre-maturity RD closure

### Admin Features
- Admin authentication
- Approve / reject RD loans
- Approve EMI payments
- Manage maturity requests
- Handle pre-maturity RD closures

---

## ⚙️ Installation & Setup (Localhost)

### Backend Setup (Spring Boot)
- Open `rd-system-backend` in **Spring Tool Suite**
- Configure PostgreSQL in `application.properties`
- Create database in PostgreSQL
- Run Spring Boot application

### Frontend Setup (React + Vite)

```bash
cd rd-system-frontend
npm install
npm run dev

```

Frontend runs on:

http://localhost:5173
---

## 📂 Project Structure

```
RD-Management-System
├── rd-system-backend
├── rd-system-frontend
├── rd-project-screenshots
└── README.md
```

---

## 👨‍💻 Author

**Sumedh Bhole**  
GitHub: https://github.com/sumedhbhole

---

⭐ If you like this project, don’t forget to give it a star!

<p align="center"> <img src="https://komarev.com/ghpvc/?username=sumedhbhole&repo=RD-Management-System&label=Repository%20Views&color=0e75b6&style=flat" /> </p>

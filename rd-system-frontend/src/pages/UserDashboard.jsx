import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserDashboard() {
  
  const [user, setUser] = useState(null);
  
  //  Loan modal
  const [showLoanModal, setShowLoanModal] = useState(false);

  //  Loan form states
  const [loanAmount, setLoanAmount] = useState("");
  const [purpose, setPurpose] = useState("Education");
  const [g1, setG1] = useState("");
  const [g2, setG2] = useState("");
  const [agree, setAgree] = useState(false);
  
  //  BANK DETAILS (NEW – NOTHING ELSE TOUCHED)
  const [bankName, setBankName] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");


  //  STEP 1 — ONLY THIS STATE ADDED
  const [loans, setLoans] = useState([]);

  const navigate = useNavigate();

  //  STEP 2 — ONLY THIS FUNCTION ADDED
  const fetchLoans = async (rdId) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/loan/rd/${rdId}`
      );
      setLoans(res.data);
    } catch (err) {
      console.log("No loans found");
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("rdUser");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    const userData = JSON.parse(storedUser);

    axios
      .get(`http://localhost:8080/login/${userData.aadharNumber}`)
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("rdUser", JSON.stringify(res.data));
        fetchLoans(res.data.rdId);   // 🔹 STEP 3 — ONLY THIS LINE ADDED
      })
      .catch(() => {
        alert("Session expired");
        navigate("/login");
      });
  }, []);

  if (!user) return null;

  /* ================= CALCULATIONS ================= */
  const total = user.totalInstallments;
  const paid = user.paidInstallments;
  const remaining = total - paid;
  const progressPercent = Math.round((paid / total) * 100);
  /* ================= APPROVED LOAN ================= */
  const approvedLoan = loans.find(loan => loan.status === 1);

  /* ================= STATUS BADGE ================= */
  const getStatusBadge = (status) => {
    if (status === 0) return <span className="badge bg-primary">Active</span>;
    if (status === 1) return <span className="badge bg-warning text-dark">Completed</span>;
    if (status === 2) return <span className="badge bg-danger">Closed</span>;
    if (status === 3) return <span className="badge bg-success">Maturity Paid</span>;

  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  /* ================= LOAN ELIGIBILITY ================= */
  const isLoanEligible =
    user.rdStatus === 0 && user.paidInstallments >= 6;

  const getEligibleLoanAmount = () => {
  if (user.paidInstallments < 6) return 0;

  const totalPaid =
    user.paidInstallments * user.monthlyAmount;

  const eligible =
    Math.floor(totalPaid * 0.6); // 60%

  return eligible;
};


  const eligibleLoanAmount = getEligibleLoanAmount();

  /* ================= APPLY LOAN ================= */
  const handleApplyLoan = async () => {

    if (!agree) {
      alert("Please agree to loan terms & conditions");
      return;
    }
      if (!loanAmount || loanAmount <= 0) {
      alert("Please enter loan amount");
      return;
    }

      if (loanAmount > eligibleLoanAmount) {
        alert(`Requested amount cannot exceed ₹${eligibleLoanAmount}`);
        return;
      }


    try {
      const res = await axios.post("http://localhost:8080/loan/apply", {
        rdId: user.rdId,
        requestedAmount: loanAmount,
        eligibleAmount: eligibleLoanAmount,
        purpose,
        guarantor1Aadhar: g1,
        guarantor2Aadhar: g2,
          bankName,
          accountHolderName,
          accountNumber,
          ifscCode
      });

      alert(res.data);
      setShowLoanModal(false);

      // reset form
      setLoanAmount("");
      setG1("");
      setG2("");
      setAgree(false);
      fetchLoans(user.rdId);   //  refresh loan table immediately


    } catch (err) {
      alert("Loan apply failed");
    }
  };

  return (
    <>
    {/* ===== APP HEADER ===== */}
<div className="container mt-4">
  <div className="bg-primary text-white px-4 py-3 rounded-4 shadow
                  d-flex justify-content-between align-items-center">
                    

    {/* LEFT : Title */}
    <div>
      <h3 className="mb-0">🏦 RD Management System</h3>
      <small className="opacity-75">Recurring Deposit Portal</small>
    </div>

    {/* RIGHT : Logout */}
    <button
      className="btn btn-danger"
      onClick={handleLogout}
      >Logout
    </button>

  </div>
</div>

<div className="container mt-3">
  <div className="alert alert-primary text-center fw-semibold shadow-sm">
    🔔 Welcome to RD Management System — Secure Recurring Deposit Portal
  </div>
</div>

    <div className="container mt-4">
      <div className="card shadow">

        <div className="card-header bg-primary text-white">
          <h4>Welcome, {user.customerName}</h4>
        </div>

        <div className="card-body">

          <div className="row mb-3">
            <div className="col-md-6">
              <b>Aadhaar:</b> {user.aadharNumber}
            </div>
            <div className="col-md-6">
              <b>Mobile:</b> {user.mobileNumber}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <b>Account Number:</b> {user.accountNumber}
            </div>
            <div className="col-md-6">
              <b>Occupation:</b> {user.occupation}
            </div>
          </div>

          <hr />

          <h5>RD Details</h5>

          <div className="row">
            <div className="col-md-6">
              <p><b>Monthly Amount:</b> ₹{user.monthlyAmount}</p>
              <p><b>RD Duration:</b> {user.rdDurationMonths} months</p>
              <p><b>RD Start Date:</b> {user.rdDate}</p>
              <p><b>Total Deposit:</b> ₹{user.totalDeposit}</p>
              

            </div>

            <div className="col-md-6">
              <p><b>Paid Installments:</b> {paid} / {total}</p>
              <p><b>Remaining Installments:</b> {remaining}</p>
              <p>
                <b>Status:</b> {getStatusBadge(user.rdStatus)}
              </p>

              {user.rdStatus === 3 && (
                <p className="text-success fw-bold">
                  ✔ Maturity Amount Credited
                </p>
              )}

              <p><b>Interest Rate:</b> {user.interestRate}%</p>

              <p className="fw-bold text-success">
                <b>Maturity Amount:</b> ₹{user.maturityAmount}
              </p>

            </div>
          </div>

          <div className="mt-3">
            <label><b>RD Progress</b></label>
            <div className="progress">
              <div
                className="progress-bar bg-success"
                style={{ width: `${progressPercent}%` }}
              >
                {progressPercent}%
              </div>
            </div>
          </div>

          <div className="text-center mt-4">

            {user.rdStatus === 0 && (
              <button
                className="btn btn-success me-2"
                onClick={() => navigate("/pay-installment")}
              >
                Pay RD Installment
              </button>
            )}

            {isLoanEligible && (
              <button
                className="btn btn-warning me-2"
                onClick={() => setShowLoanModal(true)}
              >
                Apply for Loan
              </button>
            )}

            {!isLoanEligible && (
              <p className="text-danger mt-2">
                You are not eligible for loan yet (minimum 6 installments required)
              </p>
            )}

            <button
              className="btn btn-primary me-2"
              onClick={() => navigate("/passbook")}
            >
              View Passbook
            </button>
            {approvedLoan && (
              <button
                className="btn btn-info me-2"
                onClick={() => navigate(`/pay-emi/${approvedLoan.loanId}`)}
              >
                Pay EMI
              </button>
            )}
            {/* ================= RD PAYOUT ACTIONS (NEW) ================= */}

            {user.rdStatus === 1 && (
              <button
                className="btn btn-success"
                onClick={() => navigate("/maturity")}
              >
                Claim Maturity
              </button>
            )}


            {user.rdStatus === 0 && (
              <button
                className="btn btn-danger"
                onClick={() => navigate("/premature-close")}
              >
                Premature Close RD
              </button>
            )}

          </div>
          


        </div>
      </div>

      {/* ================= LOAN MODAL ================= */}
      {showLoanModal && (
        <div className="modal fade show d-block" style={{ background: "#00000080" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Apply for Loan</h5>
                <button className="btn-close" onClick={() => setShowLoanModal(false)}></button>
              </div>

              <div className="modal-body">

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label>Name</label>
                    <input className="form-control" value={user.customerName} disabled />
                  </div>
                  <div className="col-md-6">
                    <label>Aadhaar</label>
                    <input className="form-control" value={user.aadharNumber} disabled />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label>Monthly RD Amount</label>
                    <input className="form-control" value={`₹${user.monthlyAmount}`} disabled />
                  </div>
                  <div className="col-md-6">
                    <label>Paid Installments</label>
                    <input className="form-control" value={user.paidInstallments} disabled />
                  </div>
                </div>

                <div className="mb-3">
                  <label>Eligible Loan Amount</label>
                  <input className="form-control fw-bold text-success" value={`₹${eligibleLoanAmount}`} disabled />
                </div>

                <div className="mb-3">
                  <label>Requested Loan Amount</label>
                  <input
                      type="number"
                      className="form-control"
                      value={loanAmount}
                      min={1}
                      max={eligibleLoanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                    />
                    <small className="text-muted">
                      Max allowed: ₹{eligibleLoanAmount}
                    </small>

                </div>

                <div className="mb-3">
                  <label>Loan Purpose</label>
                  <select className="form-control" value={purpose} onChange={(e) => setPurpose(e.target.value)}>
                    <option>Education</option>
                    <option>Medical</option>
                    <option>Business</option>
                    <option>Personal</option>
                  </select>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label>Guarantor 1 Aadhaar</label>
                    <input className="form-control" value={g1} onChange={(e) => setG1(e.target.value)} />
                  </div>
                  <div className="col-md-6">
                    <label>Guarantor 2 Aadhaar</label>
                    <input className="form-control" value={g2} onChange={(e) => setG2(e.target.value)} />
                  </div>
                </div>
                <hr />
                  <h6 className="mt-2">🏦 Bank Details</h6>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label>Bank Name</label>
                      <input
                        className="form-control"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <label>Account Holder Name</label>
                      <input
                        className="form-control"
                        value={accountHolderName}
                        onChange={(e) => setAccountHolderName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label>Account Number</label>
                      <input
                        className="form-control"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <label>IFSC Code</label>
                      <input
                        className="form-control"
                        value={ifscCode}
                        onChange={(e) => setIfscCode(e.target.value)}
                      />
                    </div>
                  </div>

                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                  />
                  <label className="form-check-label">
                    I agree to loan terms & conditions
                  </label>
                </div>

              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowLoanModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-success" onClick={handleApplyLoan}>
                  Apply Loan
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ================= LOAN STATUS TABLE ================= */}
      <div className="card shadow mt-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">My Loan Applications</h5>
        </div>

        <div className="card-body">
          {loans.length === 0 ? (
            <p className="text-center text-muted">
              No loan applications found
            </p>
          ) : (
            <table className="table table-bordered text-center">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Requested Amount</th>
                  <th>Eligible Amount</th>
                  <th>Purpose</th>
                  <th>Status</th>
                  <th>Applied Date</th>
                </tr>
              </thead>

              <tbody>
                {loans.map((loan, index) => (
                  <tr key={loan.loanId}>
                    <td>{index + 1}</td>
                    <td>₹{loan.requestedAmount}</td>
                    <td>₹{loan.eligibleAmount}</td>
                    <td>{loan.purpose}</td>
                    <td>
                      {loan.status === 0 && (
                        <span className="badge bg-warning">Pending</span>
                      )}
                      {loan.status === 1 && (
                        <span className="badge bg-success">Approved</span>
                      )}
                      {loan.status === 2 && (
                        <span className="badge bg-danger">Rejected</span>
                      )}
                    </td>
                    <td>{loan.appliedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

    </div>
    </>
  );
}

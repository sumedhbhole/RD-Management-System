import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/rdUserService";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: "",
    mobileNumber: "",
    customerAddress: "",
    dateOfBirth: "",
    gender: "",
    rdDurationMonths: "",
    monthlyAmount: "",
    occupation: "",
    aadharNumber: "",
    panNumber: "",
    nomineeName: "",
    nomineeAddress: "",
    nomineeAadharNumber: "",
    nomineePanNumber: "",
    agree: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  /* ===== PLAN CONFIG ===== */
  const planOptions = {
    12: [1000, 2000],
    24: [1500, 2500]
  };

  const duration = Number(formData.rdDurationMonths);
  const monthly = Number(formData.monthlyAmount);

  /* ===== FRONTEND DISPLAY CALCULATION (ONLY UI) ===== */
  const totalDeposit = duration && monthly ? duration * monthly : 0;

  let interestRate = 0;
  if (duration === 12) interestRate = 12;
  else if (duration === 24) interestRate = 15;

  const maturityAmount =
    totalDeposit && interestRate
      ? Math.round(totalDeposit + (totalDeposit * interestRate) / 100)
      : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agree) {
      alert("Please accept Terms & Conditions");
      return;
    }

    /* ===== FINAL PAYLOAD =====
       interestRate / maturity / deposit frontend se nahi bhej rahe
        backend khud calculate karega (secure logic)
    */
    const payload = {
      ...formData,
      rdDate: new Date().toISOString().split("T")[0]
    };

    try {
      await registerUser(payload);
      alert("Registration Successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white text-center">
          <h4>RD User Registration</h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>

            {/* ===== RD PLAN ===== */}
            <h5 className="mb-3">RD Plan Selection</h5>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">RD Duration *</label>
                <select
                  className="form-select"
                  name="rdDurationMonths"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Duration</option>
                  <option value="12">1 Year (12 Months)</option>
                  <option value="24">2 Years (24 Months)</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Monthly Amount *</label>
                <select
                  className="form-select"
                  name="monthlyAmount"
                  onChange={handleChange}
                  required
                  disabled={!formData.rdDurationMonths}
                >
                  <option value="">Select Amount</option>
                  {planOptions[duration]?.map((amt) => (
                    <option key={amt} value={amt}>
                      ₹{amt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ===== CALCULATION ===== */}
            <div className="row mb-4">
              <div className="col-md-6">
                <label className="form-label">Total Deposit</label>
                <input
                  className="form-control"
                  value={totalDeposit ? `₹${totalDeposit}` : ""}
                  readOnly
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Expected Maturity ({interestRate || 0}%)
                </label>
                <input
                  className="form-control"
                  value={maturityAmount ? `₹${maturityAmount}` : ""}
                  readOnly
                />
              </div>
            </div>

            {/* ===== CUSTOMER DETAILS ===== */}
            <h5 className="mb-3">Customer Details</h5>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Customer Name *</label>
                <input className="form-control" name="customerName" onChange={handleChange} required />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Mobile Number *</label>
                <input className="form-control" name="mobileNumber" onChange={handleChange} required />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Address *</label>
                <input className="form-control" name="customerAddress" onChange={handleChange} required />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Occupation *</label>
                <input className="form-control" name="occupation" onChange={handleChange} required />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Date of Birth *</label>
                <input type="date" className="form-control" name="dateOfBirth" onChange={handleChange} required />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Gender *</label>
                <select className="form-select" name="gender" onChange={handleChange} required>
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Aadhaar Number *</label>
                <input className="form-control" name="aadharNumber" onChange={handleChange} required />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">PAN Number *</label>
                <input className="form-control" name="panNumber" onChange={handleChange} required />
              </div>
            </div>

            {/* ===== NOMINEE ===== */}
            <h5 className="mt-4">Nominee Details</h5>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Nominee Name *</label>
                <input className="form-control" name="nomineeName" onChange={handleChange} required />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Nominee Address *</label>
                <input className="form-control" name="nomineeAddress" onChange={handleChange} required />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Nominee Aadhaar *</label>
                <input className="form-control" name="nomineeAadharNumber" onChange={handleChange} required />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Nominee PAN *</label>
                <input className="form-control" name="nomineePanNumber" onChange={handleChange} required />
              </div>
            </div>

            {/* ===== TERMS ===== */}
            <div className="form-check mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                required
              />
              <label className="form-check-label">
                I agree to the{" "}
                <a href="/terms" target="_blank" rel="noopener noreferrer">
                  Terms & Conditions
                </a>
              </label>
            </div>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/login")}
              >
                Cancel
              </button>

              <button type="submit" className="btn btn-success">
                Register
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

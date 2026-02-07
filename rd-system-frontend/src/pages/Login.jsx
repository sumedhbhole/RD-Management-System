import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  //  ROLE STATE
  const [role, setRole] = useState("user");

  //  USER STATE
  const [aadhar, setAadhar] = useState("");

  //  ADMIN STATE
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");

    //  LOADING STATE (SPINNER)
  const [loading, setLoading] = useState(false);


  /* ================= USER LOGIN ================= */
  const handleUserLogin = async (e) => {
    e.preventDefault();

    if (!aadhar) {
      alert("Please enter Aadhaar Number");
      return;
    }

    try {
      setLoading(true); // blur + spinner ON
      // 2 sec fake delay (UX ke liye)
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 sec delay
      const res = await axios.get(`http://localhost:8080/login/${aadhar}`);
      localStorage.setItem("rdUser", JSON.stringify(res.data));
      navigate("/user/dashboard");
    } catch (err) {
      alert("Invalid Aadhaar Number");
    }
    finally {
      setLoading(false); // blur + spinner OFF
    }
  };

  /* ================= ADMIN LOGIN ================= */
  const handleAdminLogin = (e) => {
    e.preventDefault();

    //  TEMP (backend baad me)
    if (adminUser === "admin" && adminPass === "admin123") {
      localStorage.setItem(
  "admin",
  JSON.stringify({
    loggedIn: true,
    username: adminUser
  })
);
navigate("/admin/dashboard");

    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <>
  {/*  SPINNER OVERLAY */}
  {loading && (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        background: "rgba(255,255,255,0.6)",
        zIndex: 2000,
      }}
    >
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )}
  {/*  SPINNER OVERLAY CLOSE*/}
    <div className="container-fluid mt-5" 
    style={{
        filter: loading ? "blur(2px)" : "none",
        pointerEvents: loading ? "none" : "auto"
      }}
    >
      <div className="row justify-content-center">
        <div className="col-md-10 shadow-lg rounded" style={{ overflow: "hidden" }}>
          <div className="row">

            {/* ================= LEFT INFO PANEL (NO CHANGE) ================= */}
            <div className="col-md-6 text-white p-5"
              style={{ 
                background: "linear-gradient(135deg, #ff7a18, #ff3d77)",
              }}
            >
              <h2 className="fw-bold mb-3">More than just a Recurring Deposit</h2>

              <p>
                Secure your future with disciplined monthly savings and
                <strong> guaranteed returns up to 15%</strong> based on RD duration.
              </p>


              <ul className="mt-4">
                <li>✔ Minimum RD duration: 12 months</li>
                <li>✔ Fixed monthly deposit</li>
                <li>✔ Loan facility available after 6 months</li>
                <li>✔ Transparent & secure RD management system</li>
              </ul>


<hr className="my-4" />

<h5 className="fw-bold mt-4 text-center">
  Popular RD Plans
</h5>

<div className="row mt-4 justify-content-center">
  {/* ===== 1 YEAR RD ===== */}
  <div className="col-md-5 me-md-3 mb-3">
    <div
      className="p-4 bg-white text-dark rounded shadow-sm h-100"
      style={{ borderLeft: "5px solid #0d6efd" }}
    >
      <h6 className="fw-bold text-primary text-center mb-3">
        1 Year RD (12 Months)
      </h6>

      <p className="mb-1">₹1000 × 12 = ₹12,000</p>
      <p className="fw-bold text-success">
        Maturity: ₹13,440 (12% Return)
      </p>

      <p className="mb-1">₹2000 × 12 = ₹24,000</p>
      <p className="fw-bold text-success mb-0">
        Maturity: ₹26,880 (12% Return)
      </p>
    </div>
  </div>

  {/* ===== 2 YEAR RD ===== */}
  <div className="col-md-5 mb-3">
    <div
      className="p-4 bg-white text-dark rounded shadow-sm h-100"
      style={{ borderLeft: "5px solid #0d6efd" }}
    >
      <h6 className="fw-bold text-primary text-center mb-3">
        2 Year RD (24 Months)
      </h6>

      <p className="mb-1">₹1500 × 24 = ₹36,000</p>
      <p className="fw-bold text-success">
        Maturity: ₹41,400 (15% Return)
      </p>

      <p className="mb-1">₹2500 × 24 = ₹60,000</p>
      <p className="fw-bold text-success mb-0">
        Maturity: ₹69,000 (15% Return)
      </p>
    </div>
  </div>
</div>


            </div>

            {/* ================= RIGHT LOGIN PANEL ================= */}
            <div className="col-md-6 p-5 bg-white">
              <h3 className="fw-bold mb-2">🌸 RD Management</h3>
              <p className="text-muted">Please login to your account</p>

              {/*  ROLE SWITCH (NEW) */}
              <div className="d-flex justify-content-end mb-2">
                <button
                className={`btn btn-sm me-2 ${
                    role === "user" ? "btn-danger" : "btn-outline-danger"
                }`}
                onClick={() => setRole("user")}
                >
                User Login
                </button>

                <button
                className={`btn btn-sm ${
                    role === "admin" ? "btn-danger" : "btn-outline-danger"
                }`}
                onClick={() => setRole("admin")}
                >
                Admin Login
                </button>

              </div>

              {/* ================= USER FORM ================= */}
              {role === "user" && (
                <form onSubmit={handleUserLogin} className="mt-3">
                  <label className="form-label">Aadhaar Number</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter Aadhaar Number"
                    value={aadhar}
                    onChange={(e) => setAadhar(e.target.value)}
                  />

                  <button
                    className="btn w-100 text-white fw-bold"
                    style={{
                      background: "linear-gradient(135deg, #ff7a18, #ff3d77)",
                    }}
                  >
                    LOG IN
                  </button>

                  <p className="text-center mt-3">
                    New user?{" "}
                    <Link to="/register" className="fw-bold text-primary">
                      Create account
                    </Link>
                  </p>
                </form>
              )}

              {/* ================= ADMIN FORM ================= */}
              {role === "admin" && (
                <form onSubmit={handleAdminLogin} className="mt-3">
                  <label className="form-label">Admin Username</label>
                  <input
                    className="form-control mb-3"
                    placeholder="Enter Admin Username"
                    value={adminUser}
                    onChange={(e) => setAdminUser(e.target.value)}
                  />

                  <label className="form-label">Admin Password</label>
                  <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Enter Admin Password"
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                  />

                  <button className="btn btn-danger w-100 fw-bold">
                    ADMIN LOGIN
                  </button>
                  
                <p className="text-center mt-3">
                    New user?{" "}
                    <Link to="/register" className="fw-bold text-primary">
                        Create account
                    </Link>
                </p>

                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
    {/* ================= FOOTER ================= */}
<div className="text-center mt-4 mb-3 text-muted">
  <small>
    © 2025 <strong>Sumedh Bhole</strong> | All Rights Reserved.
  </small>
</div>

  </>);
}

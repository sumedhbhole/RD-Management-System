import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PrematureClose() {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  //  Loading state (SAFE ADD)
  const [loading, setLoading] = useState(false);

  // 🏦 Bank details
  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    accountHolderName: "",
    accountNumberCredited: "",
    ifscCode: ""
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("rdUser");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [navigate]);

  if (!user) return null;

  /* ================= CALCULATIONS ================= */
  const paidAmount = user.paidInstallments * user.monthlyAmount;
  const prematureAmount = Math.floor(paidAmount / 2);

  /* ================= PREMATURE CLOSE ================= */
  const handlePrematureClose = async () => {
    if (loading) return;        //  prevent double click
    setLoading(true);

    try {
      const res = await axios.put(
        `http://localhost:8080/premature-close/${user.rdId}`,
        bankDetails
      );

      alert(res.data);
      navigate("/user/dashboard");

    } catch {
      alert("Premature close failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">

      <div className="card shadow">
        <div className="card-header bg-danger text-white">
          <h5>Premature Close RD</h5>
        </div>

        <div className="card-body">

          {/* ===== RD SUMMARY ===== */}
          <h6>RD Summary</h6>
          <p><b>Account:</b> {user.accountNumber}</p>
          <p><b>Monthly Amount:</b> ₹{user.monthlyAmount}</p>
          <p><b>Paid Installments:</b> {user.paidInstallments}</p>
          <p><b>Total Paid Amount:</b> ₹{paidAmount}</p>

          <p className="fw-bold text-danger">
            Payable Amount (after 50% deduction): ₹{prematureAmount}
          </p>

          <hr />

          {/* ===== BANK DETAILS ===== */}
          <h6>Bank Details</h6>

          <input
            className="form-control mb-2"
            placeholder="Bank Name"
            onChange={e =>
              setBankDetails({ ...bankDetails, bankName: e.target.value })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Account Holder Name"
            onChange={e =>
              setBankDetails({ ...bankDetails, accountHolderName: e.target.value })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Account Number"
            onChange={e =>
              setBankDetails({ ...bankDetails, accountNumberCredited: e.target.value })
            }
          />

          <input
            className="form-control mb-3"
            placeholder="IFSC Code"
            onChange={e =>
              setBankDetails({ ...bankDetails, ifscCode: e.target.value })
            }
          />

          {/* ===== ACTION BUTTONS ===== */}
          <div className="d-flex gap-3">
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/user/dashboard")}
              disabled={loading}
            >
              Back
            </button>

            <button
              className="btn btn-danger"
              onClick={handlePrematureClose}
              disabled={loading}
            >
              {loading ? "Processing..." : "Confirm Premature Close"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

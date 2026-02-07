import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MaturityPayout() {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

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

    const parsedUser = JSON.parse(storedUser);

    if (parsedUser.rdStatus !== 1) {
      alert("RD not matured yet");
      navigate("/user/dashboard");
      return;
    }

    setUser(parsedUser);
  }, []);

  if (!user) return null;

  const handleMaturityPayout = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await axios.put(
        `http://localhost:8080/maturity/${user.rdId}`,
        bankDetails
      );

      alert(res.data);
      navigate("/user/dashboard");

    } catch {
      alert("Maturity payout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">

      <div className="card shadow">
        <div className="card-header bg-success text-white">
          <h5>Maturity Payout</h5>
        </div>

        <div className="card-body">

          {/* RD SUMMARY */}
          <h6>RD Summary</h6>
          <p><b>Account Number:</b> {user.accountNumber}</p>
          <p><b>Monthly Amount:</b> ₹{user.monthlyAmount}</p>
          <p><b>Total Deposit:</b> ₹{user.totalDeposit}</p>

          <p className="fw-bold text-success">
            Maturity Amount: ₹{user.maturityAmount}
          </p>

          <hr />

          {/* BANK DETAILS */}
          <h6>Bank Details for Credit</h6>

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

          <div className="d-flex gap-3">
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/user/dashboard")}
            >
              Back
            </button>

            <button
                className="btn btn-success"
                disabled={loading}
                onClick={handleMaturityPayout}
                >
  {loading ? "Submitting Request..." : "Confirm Maturity Payout"}
</button>


          </div>

        </div>
      </div>
    </div>
  );
}

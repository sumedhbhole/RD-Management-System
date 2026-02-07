import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function PayEmi() {

  const { loanId } = useParams();
  const navigate = useNavigate();

  const [emis, setEmis] = useState([]);

  useEffect(() => {
    fetchEmis();
  }, []);

  const fetchEmis = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/loan/emi/${loanId}`
      );
      setEmis(res.data);
    } catch {
      alert("Failed to load EMI");
    }
  };

  const firstPendingIndex = emis.findIndex(e => e.status === 0);

  const handlePayEmi = async (emiId) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/loan/emi/pay/${emiId}`
      );
      alert(res.data);
      fetchEmis();
    } catch {
      alert("EMI payment failed");
    }
  };

  return (
    <div className="container mt-5">

      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/user/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>

      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4>Pay Loan EMI</h4>
        </div>

        <div className="card-body">
          <table className="table table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {emis.map((emi, index) => (
                <tr key={emi.emiId}>
                  <td>{index + 1}</td>
                  <td>{emi.emiDate}</td>
                  <td>₹{emi.emiAmount}</td>

                  <td>
                    {emi.status === 1 ? (
                      <span className="badge bg-success">Paid</span>
                    ) : (
                      <span className="badge bg-warning text-dark">
                        Pending
                      </span>
                    )}
                  </td>

                  <td>
                    {emi.status === 0 && index === firstPendingIndex ? (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handlePayEmi(emi.emiId)}
                      >
                        Pay
                      </button>
                    ) : (
                      <button className="btn btn-secondary btn-sm" disabled>
                        —
                      </button>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

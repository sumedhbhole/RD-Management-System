import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminLoanEmisView() {

  const { loanId } = useParams();
  const navigate = useNavigate();
  const [emis, setEmis] = useState([]);

  useEffect(() => {
    fetchEmis();
  }, []);

  const fetchEmis = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/admin/loan/emis/${loanId}`
      );
      setEmis(res.data);
    } catch {
      alert("Failed to load loan EMIs");
    }
  };

  return (
    <div className="container mt-5">

      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate("/admin/dashboard")}
      >
        Back to Dashboard
      </button>

      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4>Loan EMI Details</h4>
        </div>

        <div className="card-body">
          <table className="table table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>EMI Date</th>
                <th>Amount</th>
                <th>Status</th>
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
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}

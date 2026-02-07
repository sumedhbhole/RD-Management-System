import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminPrematureRequests() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  //  ALL premature requests
  const fetchRequests = async () => {
    const res = await axios.get(
      "http://localhost:8080/admin/premature/pending"
    );
    setRequests(res.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  //  APPROVE
  const approveRequest = async (id) => {
    setLoadingId(id);
    try {
      await axios.put(
        `http://localhost:8080/admin/premature/approve/${id}`
      );

      // UI status update only
      setRequests(prev =>
        prev.map(r =>
          r.id === id ? { ...r, status: 1 } : r
        )
      );

      alert("Premature Close Approved ✅");
    } catch {
      alert("Approval failed ❌");
    }
    setLoadingId(null);
  };

  //  REJECT
  const rejectRequest = async (id) => {
    setLoadingId(id);
    try {
      await axios.put(
        `http://localhost:8080/admin/premature/reject/${id}`
      );

      setRequests(prev =>
        prev.map(r =>
          r.id === id ? { ...r, status: 2 } : r
        )
      );

      alert("Premature Close Rejected ❌");
    } catch {
      alert("Rejection failed");
    }
    setLoadingId(null);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>🧾 Premature Close Requests</h4>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => navigate("/admin/dashboard")}
        >
          ⬅ Back to Dashboard
        </button>
      </div>

      {requests.length === 0 ? (
        <p className="text-muted">No premature close requests</p>
      ) : (
        <table className="table table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Account No</th>
              <th>Paid Installments</th>
              <th>Paid Amount</th>
              <th>Payout Amount</th>
              <th>Bank</th>
              <th>Account Holder</th>
              <th>IFSC</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((r, i) => (
              <tr key={r.id}>
                <td>{i + 1}</td>
                <td>{r.accountNumber}</td>
                <td>{r.paidInstallments}</td>
                <td>₹{r.paidAmount}</td>
                <td className="fw-bold text-danger">
                  ₹{r.payoutAmount}
                </td>
                <td>{r.bankName}</td>
                <td>{r.accountHolderName}</td>
                <td>{r.ifscCode}</td>

                {/* STATUS */}
                <td>
                  {r.status === 0 && (
                    <span className="badge bg-warning text-dark">
                      Pending
                    </span>
                  )}
                  {r.status === 1 && (
                    <span className="badge bg-success">
                      Approved
                    </span>
                  )}
                  {r.status === 2 && (
                    <span className="badge bg-danger">
                      Rejected
                    </span>
                  )}
                </td>

                {/* ACTION */}
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    disabled={loadingId === r.id || r.status !== 0}
                    onClick={() => approveRequest(r.id)}
                  >
                    Approve
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    disabled={loadingId === r.id || r.status !== 0}
                    onClick={() => rejectRequest(r.id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

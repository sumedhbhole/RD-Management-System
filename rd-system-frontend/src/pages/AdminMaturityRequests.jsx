import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminMaturityRequests() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const fetchRequests = async () => {
    const res = await axios.get(
      "http://localhost:8080/admin/maturity/all"
    );
    setRequests(res.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  //  APPROVE (NO RE-FETCH)
  const approveRequest = async (id) => {
    setLoadingId(id);
    try {
      await axios.put(
        `http://localhost:8080/admin/maturity/approve/${id}`
      );

      setRequests(prev =>
        prev.map(r =>
          r.id === id ? { ...r, status: 1 } : r
        )
      );

      alert("Maturity Approved");
    } catch {
      alert("Approval failed");
    }
    setLoadingId(null);
  };

  //  REJECT (NO RE-FETCH)
  const rejectRequest = async (id) => {
    setLoadingId(id);
    try {
      await axios.put(
        `http://localhost:8080/admin/maturity/reject/${id}`
      );

      setRequests(prev =>
        prev.map(r =>
          r.id === id ? { ...r, status: 2 } : r
        )
      );

      alert("Maturity Rejected");
    } catch {
      alert("Rejection failed");
    }
    setLoadingId(null);
  };

  return (
    <div className="container mt-4">

      {/* 🔹 HEADER + BACK BUTTON */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">🧾 Maturity Requests</h4>

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/admin/dashboard")}
        >
          ⬅ Back to Dashboard
        </button>
      </div>

      {requests.length === 0 ? (
        <p className="text-muted">No maturity requests</p>
      ) : (
        <table className="table table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Account No</th>
              <th>Maturity Amount</th>
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
                <td>₹{r.maturityAmount}</td>
                <td>{r.bankName}</td>
                <td>{r.accountHolderName}</td>
                <td>{r.ifscCode}</td>

                {/*  STATUS */}
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

                {/*  ACTIONS */}
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

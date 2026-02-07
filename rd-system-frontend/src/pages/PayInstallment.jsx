import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PayInstallment() {
  const [installments, setInstallments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedInst, setSelectedInst] = useState(null);
  const navigate = useNavigate();

  // Logged-in user
  const user = JSON.parse(localStorage.getItem("rdUser"));

  useEffect(() => {
    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }
    fetchPassbook();
  }, []);

  //  Passbook fetch
  const fetchPassbook = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/passbookbyid/${user.rdId}`
      );

      const sorted = res.data.sort(
        (a, b) => new Date(a.rddate) - new Date(b.rddate)
      );

      setInstallments(sorted);
    } catch (err) {
      alert("Failed to load passbook");
    }
  };

  //  First pending installment
  const firstPendingIndex = installments.findIndex(
    (inst) => inst.flag === 0
  );

  // Pay button click → modal open
  const openModal = (inst) => {
    setSelectedInst(inst);
    setShowModal(true);
  };

  // 🔹 Confirm payment → backend call
  const confirmPayment = async () => {
    try {
         await axios.post(
        `http://localhost:8080/pay-rd/${selectedInst.passbookid}`
        );


      alert("Installment paid successfully");

      setShowModal(false);

      //  ONLY refresh table (no redirect)
      fetchPassbook();

    } catch (err) {
      alert("Payment failed");
    }
  };

  // 🔹 Late fine calculation (₹50/day)
  const today = new Date();
  const instDate = selectedInst
    ? new Date(selectedInst.rddate)
    : null;

  const lateDays =
    instDate && today > instDate
      ? Math.floor((today - instDate) / (1000 * 60 * 60 * 24))
      : 0;

  const fineAmount = lateDays * 50;
  const totalPayable =
    selectedInst ? selectedInst.rdamount + fineAmount : 0;

  return (
    <div className="container mt-4">
        <div className="d-flex justify-content-end mb-3">

            <button
              className="btn btn-secondary"
              onClick={() => {
                //  refresh signal for dashboard
                localStorage.setItem("refreshDashboard", "true");
                navigate("/user/dashboard");
              }}
            >
              Back to Dashboard
            </button>
          </div>
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4>Pay RD Installment</h4>
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
              {installments.map((inst, index) => (
                <tr key={inst.passbookid}>
                  <td>{index + 1}</td>
                  <td>{inst.rddate}</td>
                  <td>₹{inst.rdamount}</td>

                  <td>
                    {inst.flag === 1 ? (
                      <span className="badge bg-success">Paid</span>
                    ) : (
                      <span className="badge bg-warning text-dark">
                        Pending
                      </span>
                    )}
                  </td>

                  <td>
                    {inst.flag === 0 && index === firstPendingIndex ? (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => openModal(inst)}
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

      {/* ================= PAYMENT MODAL ================= */}
      {showModal && selectedInst && (
        <div className="modal fade show d-block" style={{ background: "#00000080" }}>
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Confirm RD Payment</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <p><b>Installment Date:</b> {selectedInst.rddate}</p>
                <p><b>RD Amount:</b> ₹{selectedInst.rdamount}</p>
                <p><b>Late Days:</b> {lateDays}</p>
                <p><b>Fine Amount:</b> ₹{fineAmount}</p>
                <hr />
                <h5>Total Payable: ₹{totalPayable}</h5>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success"
                  onClick={confirmPayment}
                >
                  Confirm & Pay
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function AdminPassbook() {
  const { rdId } = useParams(); //  user ka rdId from URL
  const [passbook, setPassbook] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    //  admin check
    if (!localStorage.getItem("admin")) {
      navigate("/login");
      return;
    }

    fetchPassbook();
  }, []);

  const fetchPassbook = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/passbookbyid/${rdId}`
      );

      const sorted = res.data.sort(
        (a, b) => new Date(a.rddate) - new Date(b.rddate)
      );

      setPassbook(sorted);
    } catch (err) {
      alert("Failed to load passbook");
    }
  };

  return (
    <div className="container mt-5">

      {/* BACK BUTTON */}
      <div className="d-flex justify-content-between mb-3">
        <h4>User Passbook</h4>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/admin/dashboard")}
        >
          Back to Admin Dashboard
        </button>
      </div>

      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">RD Passbook Details</h5>
        </div>

        <div className="card-body">
          <table className="table table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Installment Date</th>
                <th>Monthly Amount</th>
                <th>Late Days</th>
                <th>Fine Amount</th>
                <th>Total Paid</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {passbook.map((inst, index) => {
                const totalPaid =
                  inst.flag === 1
                    ? inst.rdamount + inst.fineamount
                    : "-";

                return (
                  <tr key={inst.passbookid}>
                    <td>{index + 1}</td>
                    <td>{inst.rddate}</td>
                    <td>₹{inst.rdamount}</td>
                    <td>{inst.flag === 1 ? inst.lateday : "-"}</td>
                    <td>{inst.flag === 1 ? `₹${inst.fineamount}` : "-"}</td>
                    <td>{totalPaid !== "-" ? `₹${totalPaid}` : "-"}</td>
                    <td>
                      {inst.flag === 1 ? (
                        <span className="badge bg-success">Paid</span>
                      ) : (
                        <span className="badge bg-warning text-dark">
                          Pending
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

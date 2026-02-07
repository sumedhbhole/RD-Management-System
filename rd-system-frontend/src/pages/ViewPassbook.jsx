import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export default function ViewPassbook() {
  const [passbook, setPassbook] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("rdUser"));

  useEffect(() => {
    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    fetchPassbook();
  }, []);

  const fetchPassbook = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/passbookbyid/${user.rdId}`
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
          <h4>RD Passbook</h4>
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
                    <td>
                      {inst.flag === 1 ? (
                        inst.lateday > 0 ? (
                          <span className="text-danger fw-bold">
                            {inst.lateday}
                          </span>
                        ) : (
                          0
                        )
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>
                      {inst.flag === 1 ? (
                        inst.fineamount > 0 ? (
                          <span className="text-danger fw-bold">
                            ₹{inst.fineamount}
                          </span>
                        ) : (
                          "₹0"
                        )
                      ) : (
                        "-"
                      )}
                    </td>
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

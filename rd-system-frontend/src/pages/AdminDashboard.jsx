import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [loans, setLoans] = useState([]); // for loan Statuse
  const [stats, setStats] = useState({}); // this is for cards total count 
  // this is for card total count
  const fetchDashboardStats = async () => {
    const res = await axios.get("http://localhost:8080/admin/dashboard");
    setStats(res.data);
  };
  // end here cards total count
  // function for loan status 
  const fetchLoans = async () => {
  try {
    const res = await axios.get("http://localhost:8080/admin/loan/all");
    setLoans(res.data);
  } catch (err) {
    alert("Failed to load loans");
  }
};
// function loan status end

  useEffect(() => {
  const admin = JSON.parse(localStorage.getItem("admin"));

  if (!admin?.loggedIn) {
    navigate("/login");
    return;
  }

    fetchUsers();
    fetchLoans(); // for loan status
    fetchDashboardStats(); // for cards count

  }, []);

  // loan status approved reject handler start from here 
  const handleApprove = async (loanId) => {
  try {
    const res = await axios.put(
      `http://localhost:8080/admin/loan/approve/${loanId}`
    );
    alert(res.data);
    fetchLoans(); // refresh
  } catch {
    alert("Approve failed");
  }
};

const handleReject = async (loanId) => {
  try {
    const res = await axios.put(
      `http://localhost:8080/admin/loan/reject/${loanId}`
    );
    alert(res.data);
    fetchLoans(); // refresh
  } catch {
    alert("Reject failed");
  }
};
// loan status approved reject handler end here 

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/rduser");
      setUsers(res.data);
    } catch (err) {
      alert("Failed to load users");
    }
  };

  const getStatusBadge = (status) => {
    if (status === 0) return <span className="badge bg-success">Active</span>;
    if (status === 1) return <span className="badge bg-primary">Completed</span>;
    return <span className="badge bg-danger">Closed</span>;
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/login");
  };
  // To get the customer name and Loan id 
  const getCustomerName = (rdId) => {
  const user = users.find(u => u.rdId === rdId);
  return user ? user.customerName : "—";
  };
  // end here

  return (
    <div className="container-fluid bg-light min-vh-100">
      <div className="row">
      {/* ================= SIDEBAR ================= */}
        <div className="col-md-2 bg-dark text-white p-3 min-vh-100 d-flex flex-column">
  <h5 className="text-center mb-4">🏦 RD Admin</h5>

  <ul className="nav nav-pills flex-column gap-2">

    <li className="nav-item">
      <span
        className="nav-link active bg-primary text-white"
      >
        📊 Dashboard
      </span>
    </li>

    <li className="nav-item">
      <span
        className="nav-link text-warning fw-semibold"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/admin/users")}
      >
        👥 RD Users
      </span>
    </li>

    <li className="nav-item">
      <span
        className="nav-link text-warning fw-semibold"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/admin/loans")}
      >
        💰 Loans
      </span>
    </li>

    {/*  NEW – MATURITY REQUESTS */}

      <li className="nav-item">
        <span
          className="nav-link text-warning fw-semibold"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/admin/maturity-requests")}
        >
          🧾 Maturity Requests
        </span>
      </li>
    
      <li className="nav-item">
        <span
          className="nav-link text-warning fw-semibold"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/admin/premature-requests")}
        >
          🚨 Premature Requests
        </span>
      </li>


  </ul>
  {/* 🔻 LOGOUT AT BOTTOM */}
<div className="mt-auto">
  <hr className="border-secondary mt-3 mb-3" />
  <button
    className="btn btn-danger w-100"
    onClick={handleLogout}
  >
    🚪 Logout
  </button>
</div>


</div>

        {/* ====================SIDEBAR CLOSE================= */}

<div className="col-md-10 px-5 py-4">

    {/* ================= MAIN CONTENT START ================= */}

      {/* ================= HEADER ================= */}
      
<div className="mb-4 text-center">
  <h3 className="fw-bold">
    Recurring Deposit Management System – Admin Panel
  </h3>
</div>

      
      <div className="row mb-4 g-3">

  {/* TOTAL RD USERS */}
  <div className="col-md-3">
    <div className="card text-white shadow h-100"
      style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}>
      <div className="card-body">
        <h6 className="text-uppercase">Total RD Users</h6>
        <h2 className="fw-bold">{stats.totalUsers}</h2>
        <small>All registered customers</small>
      </div>
    </div>
  </div>

  {/* ACTIVE RD */}
  <div className="col-md-3">
    <div className="card text-white shadow h-100"
      style={{ background: "linear-gradient(135deg, #43cea2, #185a9d)" }}>
      <div className="card-body">
        <h6 className="text-uppercase">Active RDs</h6>
        <h2 className="fw-bold">{stats.activeRD}</h2>
        <small>Currently running accounts</small>
      </div>
    </div>
  </div>

  {/* RD COLLECTION */}
  <div className="col-md-3">
    <div className="card text-white shadow h-100"
      style={{ background: "linear-gradient(135deg, #f7971e, #ffd200)" }}>
      <div className="card-body">
        <h6 className="text-uppercase">RD Collection</h6>
        <h2 className="fw-bold">₹{stats.totalRDCollection}</h2>
        <small>Total RD deposited</small>
      </div>
    </div>
  </div>

  {/* LOAN DISTRIBUTED */}
  <div className="col-md-3">
    <div className="card text-white shadow h-100"
      style={{ background: "linear-gradient(135deg, #ff416c, #ff4b2b)" }}>
      <div className="card-body">
        <h6 className="text-uppercase">Loan Distributed</h6>
        <h2 className="fw-bold">₹{stats.totalLoanDistributed}</h2>
        <small>Approved loan amount</small>
      </div>
    </div>
  </div>

  {/* EMI COLLECTED */}
  <div className="col-md-3">
    <div className="card text-white shadow h-100"
      style={{ background: "linear-gradient(135deg, #11998e, #38ef7d)" }}>
      <div className="card-body">
        <h6 className="text-uppercase">EMI Collected</h6>
        <h2 className="fw-bold">₹{stats.totalEmiCollected}</h2>
        <small>Total EMI received</small>
      </div>
    </div>
  </div>

  {/* MATURITY PAID */}
  <div className="col-md-3">
    <div className="card text-white shadow h-100"
      style={{ background: "linear-gradient(135deg, #56ab2f, #a8e063)" }}>
      <div className="card-body">
        <h6 className="text-uppercase">Maturity Paid</h6>
        <h3 className="fw-bold">₹{stats.maturityPaid}</h3>
        <small>{stats.maturityUsers} users</small>
      </div>
    </div>
  </div>

  {/* PREMATURE PAID */}
  <div className="col-md-3">
    <div className="card text-white shadow h-100"
      style={{ background: "linear-gradient(135deg, #f7971e, #f44336)" }}>
      <div className="card-body">
        <h6 className="text-uppercase">Prematurity Paid</h6>
        <h3 className="fw-bold">₹{stats.prematurePaid}</h3>
        <small>{stats.prematureUsers} users</small>
      </div>
    </div>
  </div>

  {/* CLOSED RD */}
  <div className="col-md-3">
    <div className="card text-white shadow h-100"
      style={{ background: "linear-gradient(135deg, #232526, #414345)" }}>
      <div className="card-body">
        <h6 className="text-uppercase">Closed RDs</h6>
        <h3 className="fw-bold">{stats.closedRds}</h3>
        <small>Total closed accounts</small>
      </div>
    </div>
  </div>

</div>

      {/* ================= USER LIST TABLE ================= */}
      <div className="card shadow">
        <div className="card-header bg-dark text-white">
          <h5 className="mb-0">RD Users List</h5>
        </div>

        <div className="card-body">
          <table className="table table-bordered table-hover text-center">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Aadhaar</th>
                <th>Mobile</th>
                <th>Paid</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="8">No users found</td>
                </tr>
              ) : (
                users.map((u, index) => (
                  <tr key={u.rdId}>
                    <td>{index + 1}</td>
                    <td>{u.customerName}</td>
                    <td>{u.aadharNumber}</td>
                    <td>{u.mobileNumber}</td>
                    <td>{u.paidInstallments}</td>
                    <td>{u.totalInstallments}</td>
                    <td>{getStatusBadge(u.rdStatus)}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() =>
                          navigate(`/admin/passbook/${u.rdId}`)
                        }
                      >
                        View Passbook
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card shadow mt-4">
  <div className="card-header bg-dark text-white">
    <h5 className="mb-0">Loan Requests</h5>
  </div>

  <div className="card-body">
    {loans.length === 0 ? (
      <p className="text-center text-muted">No loan requests</p>
    ) : (
      <table className="table table-bordered text-center">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>RD ID</th>
            <th>Customer Name</th>
            <th>Requested</th>
            <th>Eligible</th>
            <th>Purpose</th>
            <th>Status</th>
            <th>Action</th>
            <th>View EMIs</th>
          </tr>
        </thead>

        <tbody>
          {loans.map((loan, index) => (
            <tr key={loan.loanId}>
              <td>{index + 1}</td>
              <td>{loan.rdId}</td>
              <td>{getCustomerName(loan.rdId)}</td>
              <td>₹{loan.requestedAmount}</td>
              <td>₹{loan.eligibleAmount}</td>
              <td>{loan.purpose}</td>
              <td>
                {loan.status === 0 && (
                  <span className="badge bg-warning">Pending</span>
                )}
                {loan.status === 1 && (
                  <span className="badge bg-success">Approved</span>
                )}
                {loan.status === 2 && (
                  <span className="badge bg-danger">Rejected</span>
                )}
                  {loan.status === 3 && (
                  <span className="badge bg-secondary">Closed</span>
                )}
              </td>
              <td>
                {loan.status === 0 && (
                  <>
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => handleApprove(loan.loanId)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleReject(loan.loanId)}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
              <td>
              {(loan.status === 1 || loan.status === 3) && (
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => navigate(`/admin/loan/emis/${loan.loanId}`)}
                > View Loan EMIs
                </button>
              )}
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
  </div>
  </div> 
  {/* ================= MAIN CONTENT END ================= */}
  </div>{/* row */}
  
  </div>
  );}

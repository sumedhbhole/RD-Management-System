import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import TermsAndConditions from "./pages/TermsAndConditions";
import PayInstallment from "./pages/PayInstallment";
import ViewPassbook from "./pages/ViewPassbook";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPassbook from "./pages/AdminPassbook";
import PayEmi from "./pages/PayEmi";
import AdminLoanEmisView from "./pages/AdminLoanEmisView";
import PrematureClose from "./pages/PrematureClose";
import MaturityPayout from "./pages/MaturityPayout";
import AdminMaturityRequests from "./pages/AdminMaturityRequests";
import AdminPrematureRequests from "./pages/AdminPrematureRequests";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/user/dashboard" element={<UserDashboard />} />
      <Route path="/terms" element={<TermsAndConditions />} />
      <Route path="/pay-installment" element={<PayInstallment />} />
      <Route path="/passbook" element={<ViewPassbook />} />

      {/* ADMIN */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/passbook/:rdId" element={<AdminPassbook />} />
      <Route path="/admin/loan/emis/:loanId" element={<AdminLoanEmisView />} />
      <Route path="/admin/maturity-requests" element={<AdminMaturityRequests />} />
      <Route path="/admin/premature-requests" element={<AdminPrematureRequests />}
      /> 

      {/* USER ACTIONS */}
      <Route path="/pay-emi/:loanId" element={<PayEmi />} />
      <Route path="/premature-close" element={<PrematureClose />} />
      <Route path="/maturity" element={<MaturityPayout />} />
    </Routes>
  );
}

export default App;

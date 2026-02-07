import { useNavigate } from "react-router-dom";

export default function TermsAndConditions() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow-lg border-0">

        {/* ================= HEADER ================= */}
        <div className="card-header bg-dark text-white text-center">
          <h4 className="mb-0">Terms & Conditions</h4>
          <small className="text-light">
            Recurring Deposit & Loan Policy
          </small>
        </div>

        {/* ================= BODY ================= */}
        <div className="card-body">
          <ol className="list-group list-group-numbered">

            <li className="list-group-item">
              The Recurring Deposit (RD) amount must be deposited continuously
              for a minimum duration of
              <strong> twelve (12) months</strong>.
            </li>

            <li className="list-group-item">
              The RD installment must be paid on the specified due date every month.
              In case of late payment, a penalty of
              <strong> ₹50 per day</strong> will be charged until payment is completed.
            </li>

            <li className="list-group-item">
              Once started, an RD account cannot be closed midway.
              In case of premature closure,
              <strong> only 50% of the deposited amount</strong> will be paid to the user,
              subject to admin approval.
            </li>

            <li className="list-group-item">
              Loan facilities are available only to
              <strong> active RD account holders</strong>
              who have completed a minimum of
              <strong> six (6) monthly installments</strong>.
            </li>

            <li className="list-group-item">
              To apply for a loan, the applicant must provide
              <strong> two guarantors</strong>,
              both of whom should be registered RD account holders.
            </li>

            {/* ===== RD RETURN / INTEREST POLICY ===== */}
            <li className="list-group-item">
              <strong>RD Return / Interest Policy:</strong>
              <ul className="mt-2">
                <li>
                  RD Duration <strong>12 Months</strong> →
                  <strong> 12% interest</strong> on total deposited amount
                </li>
                <li>
                  RD Duration <strong>24 Months</strong> →
                  <strong> 15% interest</strong> on total deposited amount
                </li>
              </ul>
            </li>

            {/* ===== LOAN ELIGIBILITY POLICY ===== */}
            <li className="list-group-item">
              <strong>Loan Eligibility Policy:</strong>
              <ul className="mt-2">
                <li>
                  Minimum RD duration required:
                  <strong> 6 months</strong>
                </li>
                <li>
                  Loan eligibility is calculated based on
                  <strong> RD installment amount and payment consistency</strong>
                </li>
                <li>
                  Maximum loan amount can be up to
                  <strong> 10× of the monthly RD installment</strong>
                </li>
                <li>
                  All loan requests are subject to
                  <strong> admin verification and approval</strong>
                </li>
              </ul>
            </li>

            <li className="list-group-item">
              By proceeding further, I confirm that I have carefully read,
              understood, and agreed to all the above terms and conditions
              voluntarily without any coercion.
            </li>

          </ol>

          {/* ================= ACTION BUTTONS ================= */}
          <div className="d-flex justify-content-center gap-3 mt-4">
            <button
              className="btn btn-outline-secondary px-4"
              onClick={() => navigate("/register")}
            >
              ⬅ Back to Registration
            </button>

            <button
              className="btn btn-primary px-4"
              onClick={() => navigate("/user/dashboard")}
            >
              🏠 Go to Dashboard
            </button>
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="card-footer text-center text-muted">
          © 2025 Recurring Deposit Management System
        </div>

      </div>
    </div>
  );
}

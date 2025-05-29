import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./PlansBilling.module.scss";

const cx = classNames.bind(styles);

const plansBenefits = [
  { icon: "✓", text: "6 Active Jobs", type: "active" },
  { icon: "✓", text: "Highlights Job with Colors", type: "active" },
  { icon: "✓", text: "60 Days Resume Visibility", type: "active" },
  { icon: "✓", text: "Urgents & Featured Jobs", type: "active" },
  { icon: "✓", text: "Access & Saved 20 Candidates", type: "active" },
  { icon: "✓", text: "24/7 Critical Support", type: "active" },

  { icon: "✗", text: "9 Resume Access", type: "inactive" },
  { icon: "✗", text: "4 Active Jobs", type: "inactive" },
  { icon: "✗", text: "21 Days resume visibility", type: "inactive" },
];

const latestInvoices = [
  { id: "#487441", date: "Dec 7, 2019 23:26", plan: "Premium", amount: "$999 USD" },
  { id: "#653518", date: "Dec 7, 2019 23:26", plan: "Standard", amount: "$999 USD" },
  { id: "#267400", date: "Dec 7, 2019 23:26", plan: "Premium", amount: "$999 USD" },
  { id: "#651535", date: "Dec 7, 2019 23:26", plan: "Premium", amount: "$999 USD" },
  { id: "#449003", date: "Dec 7, 2019 23:26", plan: "Premium", amount: "$999 USD" },
  { id: "#558612", date: "Dec 7, 2019 23:26", plan: "Premium", amount: "$999 USD" },
];

const ITEMS_PER_PAGE = 7;

const PlansBilling = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(latestInvoices.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentInvoices = latestInvoices.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={cx("container")}>
      <div className={cx("top-grid")}>
        <div className={cx("box", "current-plan")}>
          <div className={cx("title-small")}>Current Plan</div>
          <div className={cx("plan-name")}>Premium</div>
          <div className={cx("description")}>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere.
          </div>
          <div className={cx("actions")}>
            <button className={cx("btn", "btn-primary")}>Change Plans</button>
            <button className={cx("btn", "btn-cancel")}>Cancel Plan</button>
          </div>
        </div>

        <div className={cx("box", "plan-benefits")}>
          <div className={cx("title-small")}>Plan Benefits</div>
          <div className={cx("benefits-text")}>
            Proin porta enim sit amet placerat finibus. Sed eget laoreet lorem.
          </div>
          <div className={cx("benefits-list-row")}>
            <ul className={cx("benefits-list")}>
              {plansBenefits
                .filter((b, i) => i < 6)
                .map(({ icon, text }, index) => (
                  <li key={index} className={cx("benefit-active")}>
                    <span className={cx("icon")}>✔</span> {text}
                  </li>
                ))}
            </ul>
            <ul className={cx("benefits-list")}>
              {plansBenefits
                .filter((b, i) => i >= 6)
                .map(({ icon, text }, index) => (
                  <li key={index} className={cx("benefit-inactive")}>
                    <span className={cx("icon")}>✗</span> {text}
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className={cx("box", "next-invoices")}>
          <div className={cx("amount")}>$59.00 USD</div>
          <div className={cx("date")}>Nov 28, 2021</div>
          <div className={cx("package-start")}>Package started: Jan 28, 2021</div>
          <div className={cx("notice")}>You have to pay this amount of money every month.</div>
          <button className={cx("btn", "btn-pay")}>Pay Now →</button>
        </div>

        <div className={cx("box", "payment-card")}>
          <div className={cx("card-header")}>
            <div className={cx("card-logo")}>Mastercard</div>
            <div>
              <div className={cx("card-name")}>Esther Howard</div>
              <div className={cx("expire-date")}>Expire date 12/29</div>
            </div>
            <button className={cx("btn-edit")}>Edit Card</button>
          </div>
          <div className={cx("card-number")}>6714 **** **** ****</div>
        </div>
      </div>

      <div className={cx("latest-invoices")}>
        <h3>Latest Invoices</h3>
        <table>
          <thead>
            <tr>
              <th>#ID</th>
              <th>DATE</th>
              <th>PLAN</th>
              <th>AMOUNT</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentInvoices.map(({ id, date, plan, amount }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{date}</td>
                <td>{plan}</td>
                <td>{amount}</td>
                <td>
                  <button className={cx("download-btn")} title="Download Invoice">
                    ⬇
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={cx("pagination")}>
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            ←
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              className={cx({ active: currentPage === i + 1 })}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlansBilling;

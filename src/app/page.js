"use client";

import Link from "next/link";
import { tableDB } from "../lib/appwrite";

export default function Home() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await tableDB.listRows({
          databaseId: process.env.APPWRITE_DATABASE_ID,
          tableId: process.env.APPWRITE_CUSTOMERS_TABLE_ID,
        });
        setCustomers(res.documents);
      } catch (err) {
        console.error("Error fetching customers:", err);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <>
    <div className="wrap">
      <h1>DQ CAKE MARKETING TOOL</h1>
      <div className="top-actions">
        <Link href="/add-customer" className="btn-add">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add New
        </Link>

        <div className="filter-box">
          <div className="filter-row">
            <input type="number" min="1" defaultValue="1" className="filter-input" />
            <button className="btn-filter" title="Filter">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="22 3 2 3 10 12 10 19 14 21 14 12 22 3" />
              </svg>
            </button>
          </div>
          <small className="filter-info">
            Filter upcoming events by X numbers of days
          </small>
        </div>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Order Date</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="customerTableBody">
            {customers.map((c) => (
            <tr key={c.$id}> 
              <td data-label="Name">Aisha Khan</td>
              <td data-label="Email">aisha.khan@example.com</td>
              <td data-label="Phone">Product Manager</td>
              <td data-label="Order Date">09/05/1994</td>
              <td data-label="Description">Sep 18, 2025</td>
              {/*<td data-label="Status"><span className="status green">Active</span></td> */}
              <td data-label="Actions" className="actions">
                <button className="btn-delete">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="Red"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                    <path d="M10 11v6"></path>
                    <path d="M14 11v6"></path>
                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
                  </svg>
                </button>
              </td>
            </tr> ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}

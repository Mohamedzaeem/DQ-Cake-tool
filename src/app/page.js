"use client";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import { useCustomer } from "@/hooks/useCustomer";
import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect, useRef } from "react";

function Home() {
  const { customers } = useCustomer();
  const { currentUser, loading } = useAuth();
  const router = useRouter();
  const [filterDays, setFilterDays] = useState(1);
  const hasRedirected = useRef(false);         // 5️⃣ Hook

  useEffect(() => {
    if (!loading && !currentUser && !hasRedirected.current) {
      hasRedirected.current = true;
      router.replace("/login");
    }
  }, [currentUser, loading, router]);


  // Create a derived list — original remains unchanged
  const filteredCustomers = useMemo(() => {
    if (!customers) return [];

    const today = new Date();

    return customers
      .map((c) => ({ ...c })) // <-- defensive copy of each object (optional but safest)
      .filter((c) => {
        if (!c.DateOrdered) return false;

        const orderDate = new Date(c.DateOrdered);

        // Calculate upcoming event date
        const upcoming = new Date(
          today.getFullYear(),
          orderDate.getMonth(),
          orderDate.getDate(),
        );

        if (upcoming < today) {
          upcoming.setFullYear(today.getFullYear() + 1);
        }

        const diffMs = upcoming - today;
        const diffDays = diffMs / (1000 * 60 * 60 * 24);

        return diffDays <= filterDays;
      });
  }, [customers, filterDays]);

    if (loading) return <div>Loading...</div>;

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
              <input
                type="number"
                min="1"
                value={filterDays}
                onChange={(e) => setFilterDays(Number(e.target.value))}
                className="filter-input"
              />
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
              {filteredCustomers.map((c) => (
                <tr key={c.$id}>
                  <td data-label="Name">{c.FirstName} {c.LastName}</td>
                  <td data-label="Email">{c.Email}</td>
                  <td data-label="Phone">{c.PhoneNumber}</td>
                  <td data-label="Order Date">{new Date(c.DateOrdered).toLocaleDateString("en-US")}</td>
                  <td data-label="Description">{c.Description}</td>
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
                        <path d="M10 11v6"></path> <path d="M14 11v6"></path>
                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}

              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No upcoming events within {filterDays} days
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Home;

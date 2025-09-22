"use client";

import Link from "next/link";
 import React from 'react';

export default function AddCustomerPage() {
  return (
    <div className="form-page">
        <div className="wrap">
          
          <nav className="breadcrumb">
            <Link href="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-current">Add Customer</span>
          </nav>
    
          <h1>Add New Customer</h1>
    
      <br></br>

    <div className="form-card">
      <form id="addCustomerForm">
        <div className="form-group">
          <label for="FirstName">First Name</label>
          <input type="text" id="FirstName" name="FirstName" required />
        </div>

        <div className="form-group">
          <label for="LastName">Last Name</label>
          <input type="text" id="LastName" name="LastName" required />
        </div>

        <div className="form-group">
          <label for="Email">Email</label>
          <input type="email" id="Email" name="Email" required />
        </div>

        <div className="form-group">
          <label for="PhoneNumber">Phone Number</label>
          <input type="tel" id="PhoneNumber" name="PhoneNumber" required />
        </div>

        <div className="form-group">
          <label for="DateOrdered">Date Ordered</label>
          <input type="date" id="DateOrdered" name="DateOrdered" required />
        </div>

        <div className="form-group">
          <label for="Description">Description</label>
          <textarea id="Description" name="Description" rows="4"></textarea>
        </div>

        <button type="submit" className="btn-add">Add Customer</button>
      </form>
    </div>
</div>
</div>
  );
}
